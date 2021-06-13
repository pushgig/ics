// @flow
export const LINE_SEPARATOR = '\r\n'
export const LINE_MAX_LENGTH = 75 // in octets

export function unquote(value: string): string {
  if (value && value.startsWith('"') && value.endsWith('"')) {
    return value.substring(0, value.length - 1).substring(1)
  }

  return value
}

export function quote(value: ?string): string {
  if (value) {
    return `"${unquote(value)}"`
  }

  return `""`
}

export function shouldQuote(value: string): boolean {
  // eslint-disable-next-line no-control-regex
  return /[:;,]|[^\x00-\x7F]/gm.test(value)
}

export function escape(value: string): string {
  return value
    .replace(/\\/gm, '\\\\')
    .replace(/\r?\n/gm, '\\n')
    .replace(/([,;"])/gm, '\\$1')
}

/**
 * Gets the byte length of an utf8 string
 */
export function byteLength(str: string): number {
  let len = str.length

  for (let i = str.length - 1; i >= 0; i -= 1) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) {
      len += 1
    } else if (code > 0x7ff && code <= 0xffff) {
      len += 2
    }

    if (code >= 0xdc00 && code <= 0xdfff) {
      i -= 1 // trail surrogate
    }
  }

  return len
}

export function foldLine(line: string): string {
  const parts = []
  let current = line
  let length = LINE_MAX_LENGTH

  while (byteLength(current) > length) {
    parts.push(current.slice(0, length))
    current = current.slice(length)
    length = LINE_MAX_LENGTH - 1
  }

  parts.push(current)
  return parts.join('\r\n\t')
}

export function joinLines(lines: string[], trailingNewline: boolean = false): string {
  const joined = lines
    .map((line) => (line ? line.trim() : null))
    .filter((line) => line && line.length)
    .join(LINE_SEPARATOR)
  return trailingNewline ? `${joined}${LINE_SEPARATOR}` : joined
}

export function customPropertyName(prefix: string, key: string): string {
  return `X-${prefix}-${key}`.toUpperCase()
}
