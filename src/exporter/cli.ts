import path from 'node:path'
import { pruneCache } from './prune.js'

export const usage = `Usage: rotion prune (--unused-for <duration> | --before <time>) [--dry-run]

Remove cache files, downloaded images and downloaded files that Rotion has
not used since the given time. Only files named the way Rotion names them are
removed. The directories come from ROTION_CACHEDIR, ROTION_DOCROOT,
ROTION_IMAGEDIR and ROTION_FILEDIR, as in a build.

Options:
  --unused-for <duration>  Remove what was not used for this long: 30m, 12h, 7d
  --before <time>          Remove what was not used since this time: an ISO 8601
                           date such as 2026-09-20T09:00:00Z, or Unix milliseconds
  --dry-run                List what would be removed, and remove nothing
  -h, --help               Show this help
`

const units: Record<string, number> = {
  s: 1000,
  m: 60 * 1000,
  h: 60 * 60 * 1000,
  d: 24 * 60 * 60 * 1000,
}

/**
 * parseDuration turns "30m", "12h" or "7d" into milliseconds, or returns
 * undefined for anything else.
 */
export function parseDuration (value: string): number | undefined {
  const m = value.match(/^(\d+)([smhd])$/)
  return m ? parseInt(m[1], 10) * units[m[2]] : undefined
}

/**
 * parseTime turns an ISO 8601 date or Unix milliseconds into a Date, or
 * returns undefined for anything else.
 */
export function parseTime (value: string): Date | undefined {
  const date = /^\d+$/.test(value) ? new Date(Number(value)) : new Date(value)
  return Number.isNaN(date.getTime()) ? undefined : date
}

class UsageError extends Error {}

function parsePruneArgs (args: string[]): { before: Date, dryRun: boolean } {
  let before: Date | undefined
  let dryRun = false
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    const [name, inline] = arg.startsWith('--') && arg.includes('=') ? [arg.slice(0, arg.indexOf('=')), arg.slice(arg.indexOf('=') + 1)] : [arg, undefined]
    const value = () => {
      const v = inline ?? args[++i]
      if (v === undefined) {
        throw new UsageError(`${name} needs a value`)
      }
      return v
    }
    switch (name) {
      case '--unused-for': {
        const v = value()
        const ms = parseDuration(v)
        if (ms === undefined) {
          throw new UsageError(`invalid duration: ${v} (use a number with s, m, h or d, such as 7d)`)
        }
        before = new Date(Date.now() - ms)
        break
      }
      case '--before': {
        const v = value()
        const time = parseTime(v)
        if (time === undefined) {
          throw new UsageError(`invalid time: ${v}`)
        }
        before = time
        break
      }
      case '--dry-run':
        dryRun = true
        break
      default:
        throw new UsageError(`unknown option: ${arg}`)
    }
  }
  if (before === undefined) {
    throw new UsageError('--unused-for or --before is required')
  }
  return { before, dryRun }
}

/**
 * run runs the command line with the arguments after "rotion", and returns
 * the exit code: 0 on success, 1 on a failure, 2 on wrong usage.
 */
export async function run (args: string[]): Promise<number> {
  const [command, ...rest] = args
  if (command === undefined || command === '-h' || command === '--help' || rest.includes('-h') || rest.includes('--help')) {
    console.log(usage)
    return command === undefined ? 2 : 0
  }
  if (command !== 'prune') {
    console.error(`rotion: unknown command: ${command}\n\n${usage}`)
    return 2
  }

  let options: { before: Date, dryRun: boolean }
  try {
    options = parsePruneArgs(rest)
  } catch (e) {
    if (e instanceof UsageError) {
      console.error(`rotion prune: ${e.message}\n\n${usage}`)
      return 2
    }
    throw e
  }

  try {
    const { removed } = await pruneCache(options)
    for (const file of removed) {
      console.log(path.relative(process.cwd(), file))
    }
    const files = `${removed.length} file${removed.length === 1 ? '' : 's'}`
    console.log(options.dryRun
      ? `would remove ${files} not used since ${options.before.toISOString()}`
      : `removed ${files} not used since ${options.before.toISOString()}`)
    return 0
  } catch (e) {
    console.error(`rotion prune: ${e instanceof Error ? e.message : e}`)
    return 1
  }
}
