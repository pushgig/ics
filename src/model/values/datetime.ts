import { DateTime as LuxDateTime } from 'luxon'
import createParameter, { Parameter } from '../parameter'

export type DateTimeProps = {
  local?: string
  utc?: string
}

export type DateTime = {
  parameters: Parameter[]
  toString: () => string
}

export default function createDateTime(props: DateTimeProps): DateTime {
  const { local, utc } = props

  let dateTime: LuxDateTime
  const hasTime = ((utc ?? local)?.length ?? 0) > 10

  if (utc) {
    dateTime = LuxDateTime.fromISO(utc).toUTC()
  } else if (local) {
    dateTime = LuxDateTime.fromISO(local)
  }

  return {
    parameters: hasTime
      ? []
      : [createParameter({ name: 'VALUE', type: 'DATE', value: dateTime.toFormat('yyyyMMdd') })],
    toString(): string {
      if (!dateTime || !dateTime.isValid) {
        throw new TypeError(`Invalid date time [${[utc, local].filter(Boolean).join(',')}]`)
      }

      if (hasTime) {
        return dateTime.toFormat(`yyyyMMdd'T'HHmmss`)
      }

      return ''
    },
  }
}
