import { DateTime as LuxDateTime } from 'luxon'
import createParameter, { Parameter, VALUE, TYPE_DATE } from '../parameter'

export type DateTimeProps = {
  local?: string
  utc?: string
}

export type DateTime = {
  isDateOnly: boolean
  parameters: Parameter[]
  toString: () => string
}

export default function createDateTime(props: DateTimeProps): DateTime {
  const { local, utc } = props

  let dateTime: LuxDateTime
  const isDateOnly = ((utc ?? local)?.length ?? 0) <= 10

  if (utc) {
    dateTime = LuxDateTime.fromISO(utc).toUTC()
  } else if (local) {
    dateTime = LuxDateTime.fromISO(local)
  }

  return {
    isDateOnly,
    parameters: isDateOnly ? [createParameter({ name: VALUE, value: TYPE_DATE })] : [],
    toString(): string {
      if (!dateTime || !dateTime.isValid) {
        throw new TypeError(`Invalid date time [${[utc, local].filter(Boolean).join(',')}]`)
      }

      if (isDateOnly) {
        return dateTime.toFormat('yyyyMMdd')
      }

      return dateTime.toFormat(`yyyyMMdd'T'HHmmss`)
    },
  }
}
