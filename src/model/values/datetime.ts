import { DateTime as LuxDateTime } from 'luxon'

export type DateTimeProps = {
  local?: string
  utc?: string
}

export type DateTime = {
  toString: () => string
}

export default function createDateTime(props: DateTimeProps): DateTime {
  const { local, utc } = props

  let dateTime

  if (utc) {
    dateTime = LuxDateTime.fromISO(utc).toUTC()
  } else if (local) {
    dateTime = LuxDateTime.fromISO(local)
  }

  return {
    toString(): string {
      if (!dateTime || !dateTime.isValid) {
        throw new TypeError(`Invalid date time [${[utc, local].filter(Boolean).join(',')}]`)
      }

      return dateTime.toFormat(`yyyyMMdd'T'HHmmss`)
    },
  }
}
