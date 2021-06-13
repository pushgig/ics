import {
  escape,
  quote,
  unquote,
  shouldQuote,
  joinLines,
  foldLine,
  customPropertyName,
  LINE_MAX_LENGTH,
} from './string'

describe('ics/utils/string', () => {
  it('should escape a string', () => {
    expect(escape(';XXX;')).toBe('\\;XXX\\;')
    expect(escape(',XXX,')).toBe('\\,XXX\\,')
    expect(escape('"XXX"')).toBe('\\"XXX\\"')
    expect(escape('\\\\XXX\\\\')).toBe('\\\\\\\\XXX\\\\\\\\')
    expect(escape('\nXXX\n\n')).toBe('\\nXXX\\n\\n')
  })

  it('should quote a string', () => {
    expect(quote('XXX')).toBe('"XXX"')
    expect(quote('"XXX"')).toBe('"XXX"')
    expect(quote("'")).toBe('"\'"')
  })

  it('should unquote a string', () => {
    expect(unquote('"XXX"')).toBe('XXX')
    expect(unquote('""XXX""')).toBe('"XXX"')
    expect(unquote('"\'"')).toBe("'")
  })

  it('should check if a string should be quoted', () => {
    expect(shouldQuote('XXX')).toBe(false)
    expect(shouldQuote('XX;X')).toBe(true)
    expect(shouldQuote(':XXX')).toBe(true)
    expect(shouldQuote(':XXX')).toBe(true)
    expect(shouldQuote('XXX,')).toBe(true)
    expect(shouldQuote('💩')).toBe(true)
    expect(shouldQuote('"XXX')).toBe(false)
  })

  it('should join lines', () => {
    expect(joinLines(['XXX', null, 'XXX', false, 'XXX', undefined, ''])).toBe('XXX\r\nXXX\r\nXXX')
  })

  it('should join lines with trailing newline', () => {
    expect(joinLines(['XXX', null, 'XXX', false, 'XXX', undefined, ''], true)).toBe(
      'XXX\r\nXXX\r\nXXX\r\n',
    )
  })

  it('should trim joined lines', () => {
    expect(joinLines(['XXX  ', '  ', '   XXX', false, 'XXX  ', undefined, ' '], true)).toBe(
      'XXX\r\nXXX\r\nXXX\r\n',
    )
  })

  it('should fold long lines', () => {
    const count = 200
    const repeated = 'X'.repeat(count)
    const content = `DESCRIPTION:${repeated}`
    const folded = foldLine(content)
    const lines = folded.split('\r\n\t')

    expect(lines.length).toBe(Math.ceil(count / LINE_MAX_LENGTH))
  })

  it('should convert a key to a custom prop name', () => {
    expect(customPropertyName('prefix', 'key')).toBe('X-PREFIX-KEY')
    expect(customPropertyName('testPrefix', 'testKey')).toBe('X-TESTPREFIX-TESTKEY')
  })
})
