import { shouldQuote, quote } from '../utils/string'

export const ABBREV = 'ABBREV'
export const ALTREP = 'ALTREP'
export const CN = 'CN'
export const CUTYPE = 'CUTYPE'
export const DELEGATED_FROM = 'DELEGATED-FROM'
export const DELEGATED_TO = 'DELEGATED-TO'
export const DIR = 'DIR'
export const ENCODING = 'ENCODING'
export const FMTTYPE = 'FMTTYPE'
export const FBTYPE = 'FBTYPE'
export const LANGUAGE = 'LANGUAGE'
export const MEMBER = 'MEMBER'
export const PARTSTAT = 'PARTSTAT'
export const RANGE = 'RANGE'
export const RELATED = 'RELATED'
export const RELTYPE = 'RELTYPE'
export const ROLE = 'ROLE'
export const RSVP = 'RSVP'
export const SCHEDULE_AGENT = 'SCHEDULE-AGENT'
export const SCHEDULE_STATUS = 'SCHEDULE-STATUS'
export const SENT_BY = 'SENT-BY'
export const TYPE = 'TYPE'
export const TZID = 'TZID'
export const VALUE = 'VALUE'
export const VVENUE = 'VVENUE'
export const EXPERIMENTAL_PREFIX = 'X-'

export type ParameterProps = {
  name: string
  value: string
}

export type Parameter = {
  toString: () => string
}

export function parametersToString(params: Parameter[]): string {
  return params
    .reduce((accum: Parameter[], param) => {
      return accum.concat([';'], param.toString())
    }, [])
    .join('')
}

export default function createParameter(props: ParameterProps): Parameter {
  const { name, value } = props

  return {
    toString(): string {
      if (shouldQuote(value)) {
        return `${name}=${quote(value)}`
      }

      return `${name}=${value}`
    },
  }
}
