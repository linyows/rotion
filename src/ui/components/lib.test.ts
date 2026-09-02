import { test } from 'uvu'
import * as assert from 'uvu/assert'
import type { RichTextItemResponse } from '../../exporter/index.js'
import { joinRichTextContent, splitEquationLines } from './lib.js'

const text = (content: string): RichTextItemResponse => ({
  type: 'text',
  text: { content, link: null },
  annotations: {
    bold: false,
    italic: false,
    strikethrough: false,
    underline: false,
    code: false,
    color: 'default',
  },
  plain_text: content,
  href: null,
})

test('joinRichTextContent joins the items Notion splits by annotations', () => {
  // Notion returns a code block with a comment as several rich text items
  const richText = [text('func main() {\n  '), text('// print'), text('\n  fmt.Println("hi")\n}')]
  assert.is(joinRichTextContent(richText), 'func main() {\n  // print\n  fmt.Println("hi")\n}')
})

test('joinRichTextContent returns an empty string for no items', () => {
  assert.is(joinRichTextContent([]), '')
})

test('splitEquationLines returns the expression itself when it has no line break', () => {
  assert.equal(splitEquationLines('a = b + c'), ['a = b + c'])
})

test('splitEquationLines splits the expression by the line breaks', () => {
  assert.equal(splitEquationLines('a = b \\\\ c = d'), ['a = b', 'c = d'])
  assert.equal(splitEquationLines('a = b \\newline c = d'), ['a = b', 'c = d'])
})

test('splitEquationLines skips the star and the spacing argument of a line break', () => {
  assert.equal(splitEquationLines('a = b \\\\[1em] c = d'), ['a = b', 'c = d'])
  assert.equal(splitEquationLines('a = b \\\\*[.5em] c = d'), ['a = b', 'c = d'])
})

test('splitEquationLines drops the empty lines', () => {
  assert.equal(splitEquationLines('a = b \\\\ \\\\ c = d'), ['a = b', 'c = d'])
  assert.equal(splitEquationLines('\\\\'), ['\\\\'])
})

test('splitEquationLines keeps the line breaks in an environment', () => {
  const expression = '\\begin{aligned} a &= b \\\\ c &= d \\end{aligned}'
  assert.equal(splitEquationLines(expression), [expression])
})

test('splitEquationLines keeps the line breaks in a nested environment', () => {
  const expression = '\\begin{aligned} a &= \\begin{cases} 1 \\\\ 2 \\end{cases} \\\\ c &= d \\end{aligned}'
  assert.equal(splitEquationLines(expression), [expression])
})

test('splitEquationLines splits the expressions around an environment', () => {
  const expression = 'x = 1 \\\\ \\begin{cases} 1 \\\\ 2 \\end{cases} \\\\ y = 2'
  assert.equal(splitEquationLines(expression), ['x = 1', '\\begin{cases} 1 \\\\ 2 \\end{cases}', 'y = 2'])
})

test('splitEquationLines keeps the line breaks in a group', () => {
  const expression = '\\substack{a \\\\ b} + c'
  assert.equal(splitEquationLines(expression), [expression])
})

test('splitEquationLines does not count an escaped brace as a group', () => {
  assert.equal(splitEquationLines('\\{ a \\} \\\\ b'), ['\\{ a \\}', 'b'])
})

test.run()
