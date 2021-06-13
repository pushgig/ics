import { joinLines } from '../utils/string'
import createProperty, { Property, PropertyProps, propertiesToString } from './property'
import createTimeZone, { TimeZone, TimeZoneProps, timeZonesToString } from './components/timezone'
import { Component, componentsToString } from './component'

// Standard tokens
export const BEGIN = 'BEGIN'
export const VCALENDAR = 'VCALENDAR'
export const END = 'END'

export type CalendarProps = {
  properties?: Property[]
  timeZones?: TimeZone[]
  components?: Component[]
}

export type Calendar = {
  addProperty: (PropertyProps) => Property
  addTimeZone: (TimeZoneProps) => TimeZone
  toString: () => string
}

export default function createCalendar(props: CalendarProps): Calendar {
  const { properties = [], timeZones = [], components = [] } = props

  return {
    addProperty(prop: PropertyProps): Property {
      const property = createProperty(prop)
      properties.push(property)
      return property
    },
    addTimeZone(tz: TimeZoneProps): TimeZone {
      const timeZone = createTimeZone(tz)
      timeZones.push(timeZone)
      return timeZone
    },
    toString() {
      return joinLines([
        `${BEGIN}:${VCALENDAR}`,
        propertiesToString(properties),
        timeZonesToString(timeZones),
        componentsToString(components),
        `${END}:${VCALENDAR}`,
      ])
    },
  }
}
