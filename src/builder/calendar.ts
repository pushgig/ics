import {
  PRODID,
  VERSION,
  CALSCALE,
  METHOD,
  X_WR_CALNAME,
  X_WR_CALDESC,
  X_PUBLISHED_TTL,
} from '../model/property'
import createCalendar, { Calendar } from '../model/calendar'
import { getDefaultTimeZone } from './timezone'
import { customPropertyName } from '../utils/string'
import createDuration, { DurationProps } from '../model/values/duration'
import buildEvent, { EventBuilderProps } from './event'

export type CalendarBuilderProps = {
  prodid?: string
  name?: string
  description?: string
  ttl?: DurationProps
  events?: EventBuilderProps[]
  meta?: Object
}

export default function buildCalendar(props: CalendarBuilderProps): Calendar {
  const { prodid = 'pushgig-ics', ttl = { hours: 1 }, name, description, events = [], meta } = props

  // gather unique timezones from events
  const tzids = events.reduce((accum: string[], event) => {
    if (event.timeZone && !accum.includes(event.timeZone)) {
      return [...accum, event.timeZone]
    }

    return accum
  }, [])

  // add timezones that match events
  const calendar = createCalendar({
    timeZones: tzids.map((tzid) => getDefaultTimeZone(tzid)),
    components: events.map((event) => buildEvent(event)),
  })

  // Add default props
  calendar.addProperty({ name: PRODID, value: prodid })
  calendar.addProperty({ name: VERSION, value: '2.0' })
  calendar.addProperty({ name: CALSCALE, value: 'GREGORIAN' })
  // FIXME: add support for METHOD
  calendar.addProperty({ name: METHOD, value: 'PUBLISH' })

  if (ttl) {
    calendar.addProperty({ name: X_PUBLISHED_TTL, value: createDuration(ttl) })
  }

  if (name) {
    calendar.addProperty({ name: X_WR_CALNAME, value: name })
  }

  if (description) {
    calendar.addProperty({ name: X_WR_CALDESC, value: description })
  }

  if (meta) {
    Object.keys(meta).forEach((key) => {
      const value = meta[key]

      if (value !== null && value !== undefined) {
        calendar.addProperty({ name: customPropertyName('meta', key), value })
      }
    })
  }

  return calendar
}
