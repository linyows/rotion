import type { DatabasePropertyConfigResponse } from './types.js'

export type QueryProperties = Record<string, DatabasePropertyConfigResponse>

/**
 * Filter keys that the Notion API accepts for each property type.
 * The first key is the canonical one, the rest are aliases Notion also accepts.
 */
const filterKeysByPropertyType: Record<string, string[]> = {
  title: ['title', 'rich_text'],
  rich_text: ['rich_text', 'title'],
  url: ['url', 'rich_text'],
  email: ['email', 'rich_text'],
  phone_number: ['phone_number', 'rich_text'],
  number: ['number'],
  checkbox: ['checkbox'],
  select: ['select'],
  multi_select: ['multi_select'],
  status: ['status'],
  date: ['date'],
  created_time: ['created_time', 'date'],
  last_edited_time: ['last_edited_time', 'date'],
  last_visited_time: ['last_visited_time', 'date'],
  people: ['people'],
  created_by: ['created_by', 'people'],
  last_edited_by: ['last_edited_by', 'people'],
  files: ['files'],
  relation: ['relation'],
  formula: ['formula'],
  rollup: ['rollup'],
  unique_id: ['unique_id'],
  verification: ['verification'],
}

/** Conditions whose value is an option name of a select/multi_select/status property. */
const optionValueConditions = ['equals', 'does_not_equal', 'contains', 'does_not_contain']

const quotedList = (values: string[], max = 20): string => {
  if (values.length === 0) {
    return 'none'
  }
  const shown = values.slice(0, max).map(v => `"${v}"`).join(', ')
  return values.length > max ? `${shown}, ... (${values.length} in total)` : shown
}

const findProperty = (properties: QueryProperties, nameOrId: string): DatabasePropertyConfigResponse | undefined => {
  const byName = properties[nameOrId]
  if (byName !== undefined) {
    return byName
  }
  // Notion also accepts a property id instead of a property name
  for (const prop of Object.values(properties)) {
    if (prop.id === nameOrId) {
      return prop
    }
  }
  return undefined
}

/** Returns option names when the property has selectable options, otherwise undefined. */
const optionNamesOf = (prop: DatabasePropertyConfigResponse): string[] | undefined => {
  const config = (prop as unknown as Record<string, unknown>)[prop.type]
  if (config === null || typeof config !== 'object') {
    return undefined
  }
  const options = (config as Record<string, unknown>)['options']
  if (!Array.isArray(options)) {
    return undefined
  }
  return options.map(o => `${(o as { name?: string }).name}`)
}

const validateCondition = (prop: DatabasePropertyConfigResponse, name: string, condition: unknown, path: string, errors: string[]): void => {
  const options = optionNamesOf(prop)
  if (options === undefined || condition === null || typeof condition !== 'object') {
    return
  }
  for (const [key, value] of Object.entries(condition as Record<string, unknown>)) {
    if (!optionValueConditions.includes(key) || typeof value !== 'string') {
      continue
    }
    if (!options.includes(value)) {
      errors.push(`${path}.${key}: "${value}" is not an option of the "${name}" property -- available options: ${quotedList(options)}`)
    }
  }
}

const validateFilter = (properties: QueryProperties, filter: unknown, path: string, errors: string[]): void => {
  if (filter === null || typeof filter !== 'object' || Array.isArray(filter)) {
    errors.push(`${path}: must be an object`)
    return
  }
  const f = filter as Record<string, unknown>

  let compounded = false
  for (const key of ['and', 'or']) {
    const children = f[key]
    if (children === undefined) {
      continue
    }
    compounded = true
    if (!Array.isArray(children)) {
      errors.push(`${path}.${key}: must be an array of filters`)
      continue
    }
    children.forEach((child, i) => validateFilter(properties, child, `${path}.${key}[${i}]`, errors))
  }
  if (compounded) {
    return
  }

  // A timestamp filter has no property, e.g. { timestamp: 'created_time', created_time: {...} }
  if (typeof f['timestamp'] === 'string') {
    return
  }

  const name = f['property']
  if (typeof name !== 'string') {
    errors.push(`${path}: "property" is required -- available properties: ${quotedList(Object.keys(properties))}`)
    return
  }

  const prop = findProperty(properties, name)
  if (prop === undefined) {
    errors.push(`${path}: property "${name}" does not exist in the database -- available properties: ${quotedList(Object.keys(properties))}`)
    return
  }

  const conditionKeys = Object.keys(f).filter(k => k !== 'property')
  if (conditionKeys.length === 0) {
    errors.push(`${path}: property "${name}" has no condition, "${prop.type}" is expected`)
    return
  }

  const allowedKeys = filterKeysByPropertyType[prop.type] ?? [prop.type]
  for (const key of conditionKeys) {
    if (!allowedKeys.includes(key)) {
      errors.push(`${path}: property "${name}" is a "${prop.type}" property, but the filter uses "${key}" -- "${allowedKeys[0]}" is expected`)
      continue
    }
    validateCondition(prop, name, f[key], `${path}.${key}`, errors)
  }
}

const validateSorts = (properties: QueryProperties, sorts: unknown, errors: string[]): void => {
  if (!Array.isArray(sorts)) {
    errors.push('sorts: must be an array')
    return
  }
  sorts.forEach((sort, i) => {
    const path = `sorts[${i}]`
    if (sort === null || typeof sort !== 'object' || Array.isArray(sort)) {
      errors.push(`${path}: must be an object`)
      return
    }
    const s = sort as Record<string, unknown>
    if (s['timestamp'] !== undefined) {
      return
    }
    const name = s['property']
    if (typeof name !== 'string') {
      errors.push(`${path}: "property" or "timestamp" is required -- available properties: ${quotedList(Object.keys(properties))}`)
      return
    }
    if (findProperty(properties, name) === undefined) {
      errors.push(`${path}: property "${name}" does not exist in the database -- available properties: ${quotedList(Object.keys(properties))}`)
    }
  })
}

export interface ValidateQueryArgs {
  properties?: QueryProperties | undefined
  filter?: unknown
  sorts?: unknown
}

/**
 * validateQuery checks a query against the database properties and returns
 * human readable messages for every problem it finds. The Notion API rejects
 * such a query with a validation error that does not tell which part of the
 * query is wrong, so this runs before the request is sent.
 */
export const validateQuery = ({ properties, filter, sorts }: ValidateQueryArgs): string[] => {
  const errors: string[] = []
  if (properties === undefined || Object.keys(properties).length === 0) {
    return errors
  }
  if (filter !== undefined) {
    validateFilter(properties, filter, 'filter', errors)
  }
  if (sorts !== undefined) {
    validateSorts(properties, sorts, errors)
  }
  return errors
}

export const buildQueryValidationMessage = (target: string, errors: string[]): string => {
  return [
    `invalid query for ${target}:`,
    ...errors.map(e => `  - ${e}`),
    'The notion api rejects this query. Fix the query, or set ROTION_SKIP_QUERY_VALIDATION=true to skip this validation.',
  ].join('\n')
}
