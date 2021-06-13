import {
  UID,
  SUMMARY,
  DESCRIPTION,
  LOCATION,
  STATUS,
  DTSTART,
  DTEND,
  DURATION,
  GEO,
  URL,
} from '../model/property'
import createParameter, { Parameter, TZID } from '../model/parameter'
import createComponent, { Component, VEVENT } from '../model/component'
import createDuration, { DurationProps } from '../model/values/duration'
import createDateTime, { DateTimeProps } from '../model/values/datetime'
import createGeo, { GeoProps } from '../model/values/geo'
import { customPropertyName } from '../utils/string'

export type EventBuilderProps = {
  uid?: string
  summary?: string
  description?: string
  start: DateTimeProps
  duration?: DurationProps
  end?: DateTimeProps
  timeZone?: string
  location?: string
  geo?: GeoProps
  url?: string
  status?: string
  meta?: Object
}

export default function buildEvent(props: EventBuilderProps): Component {
  const {
    uid,
    summary,
    description,
    location,
    status = 'CONFIRMED',
    start,
    duration,
    end,
    timeZone,
    geo,
    url,
    meta,
  } = props

  const event = createComponent({ name: VEVENT })

  if (uid) {
    event.addProperty({ name: UID, value: uid })
  }

  if (summary) {
    event.addProperty({ name: SUMMARY, value: summary })
  }

  if (description) {
    event.addProperty({ name: DESCRIPTION, value: description })
  }

  if (location) {
    event.addProperty({ name: LOCATION, value: location })
  }

  if (status) {
    event.addProperty({ name: STATUS, value: status })
  }

  // get TZID param for use in DTSTART and DTEND
  const dateParams: Parameter[] = []

  if (timeZone) {
    // add ;TZID= param
    dateParams.push(createParameter({ name: TZID, value: timeZone }))
  }

  if (start) {
    event.addProperty({ name: DTSTART, value: createDateTime(start), parameters: dateParams })
  }

  if (duration) {
    event.addProperty({ name: DURATION, value: createDuration(duration) })
  }

  if (end) {
    event.addProperty({ name: DTEND, value: createDateTime(end), parameters: dateParams })
  }

  if (geo) {
    event.addProperty({ name: GEO, value: createGeo(geo) })
  }

  if (url) {
    event.addProperty({ name: URL, value: url })
  }

  if (meta) {
    Object.keys(meta).forEach((key) => {
      const value = meta[key]

      if (value !== null && value !== undefined) {
        event.addProperty({ name: customPropertyName('meta', key), value })
      }
    })
  }

  return event
}
