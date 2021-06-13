import { joinLines, foldLine, escape } from '../utils/string'
import { parametersToString } from './parameter'

export const PRODID = 'PRODID'
export const VERSION = 'VERSION'
export const CALSCALE = 'CALSCALE'
export const METHOD = 'METHOD'
export const BUSYTYPE = 'BUSYTYPE'
export const CLASS = 'CLASS'
export const CREATED = 'CREATED'
export const DESCRIPTION = 'DESCRIPTION'
export const DTSTART = 'DTSTART'
export const GEO = 'GEO'
export const LAST_MODIFIED = 'LAST-MODIFIED'
export const LOCATION = 'LOCATION'
export const ORGANIZER = 'ORGANIZER'
export const PERCENT_COMPLETE = 'PERCENT-COMPLETE'
export const PRIORITY = 'PRIORITY'
export const DTSTAMP = 'DTSTAMP'
export const SEQUENCE = 'SEQUENCE'
export const STATUS = 'STATUS'
export const SUMMARY = 'SUMMARY'
export const TRANSP = 'TRANSP'
export const UID = 'UID'
export const URL = 'URL'
export const RECURRENCE_ID = 'RECURRENCE-ID'
export const COMPLETED = 'COMPLETED'
export const DUE = 'DUE'
export const FREEBUSY = 'FREEBUSY'
export const TZID = 'TZID'
export const TZNAME = 'TZNAME'
export const TZOFFSETFROM = 'TZOFFSETFROM'
export const TZOFFSETTO = 'TZOFFSETTO'
export const TZURL = 'TZURL'
export const ACTION = 'ACTION'
export const REPEAT = 'REPEAT'
export const TRIGGER = 'TRIGGER'
export const REQUEST_STATUS = 'REQUEST-STATUS'
export const DTEND = 'DTEND'
export const DURATION = 'DURATION'
export const ATTACH = 'ATTACH'
export const ATTENDEE = 'ATTENDEE'
export const CATEGORIES = 'CATEGORIES'
export const COMMENT = 'COMMENT'
export const CONTACT = 'CONTACT'
export const EXDATE = 'EXDATE'
export const EXRULE = 'EXRULE'
export const RELATED_TO = 'RELATED-TO'
export const RESOURCES = 'RESOURCES'
export const RDATE = 'RDATE'
export const RRULE = 'RRULE'
export const COUNTRY = 'COUNTRY'
export const EXTENDED_ADDRESS = 'EXTENDED-ADDRESS'
export const LOCALITY = 'LOCALITY'
export const LOCATION_TYPE = 'LOCATION-TYPE'
export const NAME = 'NAME'
export const POSTALCODE = 'POSTAL-CODE'
export const REGION = 'REGION'
export const STREET_ADDRESS = 'STREET-ADDRESS'
export const TEL = 'TEL'
export const ACKNOWLEDGED = 'ACKNOWLEDGED'

// Experimental tokens
export const X_LIC_LOCATION = 'X-LIC-LOCATION'
export const X_WR_CALNAME = 'X-WR-CALNAME'
export const X_WR_CALDESC = 'X-WR-CALDESC'
export const X_WR_TIMEZONE = 'X-WR-TIMEZONE'
export const X_PUBLISHED_TTL = 'X-PUBLISHED-TTL'

export const ESCAPED_PROPERTIES = [NAME, DESCRIPTION, SUMMARY, LOCATION, X_WR_CALNAME, X_WR_CALDESC]

export type PropertyValue = {
  toString: () => string
}

export type PropertyProps = {
  name: string
  value: PropertyValue | string
  parameters?: Object[]
}

export type Property = {
  toString: () => string
}

export function propertiesToString(properties: Property[]): string {
  return joinLines(properties.map((prop) => prop.toString()))
}

export function shouldEscapeProperty(name: string): boolean {
  return ESCAPED_PROPERTIES.includes(name)
}

export default function createProperty(props: PropertyProps): Property {
  const { name, value, parameters = [] } = props

  return {
    toString(): string {
      // value can be a string or a complex value
      const val = typeof value === 'string' ? value : value.toString()

      const params = parametersToString(parameters)
      const escaped = shouldEscapeProperty(name) ? escape(val) : val
      return foldLine(`${name}${params}:${escaped}`)
    },
  }
}
