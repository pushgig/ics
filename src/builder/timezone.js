// @flow
import createTimeZone, { type TimeZone } from '../model/components/timezone'
import createRaw from '../model/raw'
import defaults from './timezones'

export type TimeZoneBuilderProps = {
  tzid: string,
}

export function getDefaultTimeZone(tzid: string): TimeZone {
  const timezone = defaults.find((tz) => tz.id === tzid)

  if (!timezone) {
    throw new TypeError(`No timezone found for [${tzid}]`)
  }

  return createRaw({ raw: timezone.raw })
}

export default function buildTimeZone(props: TimeZoneBuilderProps): TimeZone {
  // FIXME: finish this
  // $FlowFixMe
  return createTimeZone(props)
}
