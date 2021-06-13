// @flow
import { joinLines } from '../utils/string'

export type RawProps = {
  raw: string,
}

export type Raw = {
  toString: () => string,
}

export default function createRaw(props: RawProps): Raw {
  const { raw } = props

  return {
    toString() {
      const lines = raw.trim().split(/\r?\n/g)
      return joinLines(lines)
    },
  }
}
