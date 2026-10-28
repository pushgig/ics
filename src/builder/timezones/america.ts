type UsTimezoneRules = {
  std: [offset: string, name: string]
  dst?: [offset: string, name: string]
}

// Every US zone that observes DST has followed the same rules since 2007:
// DST starts the second Sunday of March and ends the first Sunday of
// November, both at 02:00 local time.
function usTimezone(id: string, rules: UsTimezoneRules): { id: string; raw: string } {
  const [stdOffset, stdName] = rules.std

  if (!rules.dst) {
    return {
      id,
      raw: `
        BEGIN:VTIMEZONE
        TZID:${id}
        X-LIC-LOCATION:${id}
        BEGIN:STANDARD
        TZOFFSETFROM:${stdOffset}
        TZOFFSETTO:${stdOffset}
        TZNAME:${stdName}
        DTSTART:19700101T000000
        END:STANDARD
        END:VTIMEZONE
      `,
    }
  }

  const [dstOffset, dstName] = rules.dst

  return {
    id,
    raw: `
      BEGIN:VTIMEZONE
      TZID:${id}
      X-LIC-LOCATION:${id}
      BEGIN:DAYLIGHT
      TZOFFSETFROM:${stdOffset}
      TZOFFSETTO:${dstOffset}
      TZNAME:${dstName}
      DTSTART:19700308T020000
      RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU
      END:DAYLIGHT
      BEGIN:STANDARD
      TZOFFSETFROM:${dstOffset}
      TZOFFSETTO:${stdOffset}
      TZNAME:${stdName}
      DTSTART:19701101T020000
      RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU
      END:STANDARD
      END:VTIMEZONE
    `,
  }
}

const EASTERN: UsTimezoneRules = { std: ['-0500', 'EST'], dst: ['-0400', 'EDT'] }
const CENTRAL: UsTimezoneRules = { std: ['-0600', 'CST'], dst: ['-0500', 'CDT'] }
const MOUNTAIN: UsTimezoneRules = { std: ['-0700', 'MST'], dst: ['-0600', 'MDT'] }
const MOUNTAIN_NO_DST: UsTimezoneRules = { std: ['-0700', 'MST'] }
const PACIFIC: UsTimezoneRules = { std: ['-0800', 'PST'], dst: ['-0700', 'PDT'] }
const ALASKA: UsTimezoneRules = { std: ['-0900', 'AKST'], dst: ['-0800', 'AKDT'] }
const HAWAII: UsTimezoneRules = { std: ['-1000', 'HST'] }
const ALEUTIAN: UsTimezoneRules = { std: ['-1000', 'HST'], dst: ['-0900', 'HDT'] }

// All current US IANA zones (https://www.iana.org/time-zones)
export default [
  // Eastern
  usTimezone('America/New_York', EASTERN),
  usTimezone('America/Detroit', EASTERN),
  usTimezone('America/Kentucky/Louisville', EASTERN),
  usTimezone('America/Kentucky/Monticello', EASTERN),
  usTimezone('America/Indiana/Indianapolis', EASTERN),
  usTimezone('America/Indiana/Vincennes', EASTERN),
  usTimezone('America/Indiana/Winamac', EASTERN),
  usTimezone('America/Indiana/Marengo', EASTERN),
  usTimezone('America/Indiana/Petersburg', EASTERN),
  usTimezone('America/Indiana/Vevay', EASTERN),
  // Central
  usTimezone('America/Chicago', CENTRAL),
  usTimezone('America/Indiana/Tell_City', CENTRAL),
  usTimezone('America/Indiana/Knox', CENTRAL),
  usTimezone('America/Menominee', CENTRAL),
  usTimezone('America/North_Dakota/Center', CENTRAL),
  usTimezone('America/North_Dakota/New_Salem', CENTRAL),
  usTimezone('America/North_Dakota/Beulah', CENTRAL),
  // Mountain
  usTimezone('America/Denver', MOUNTAIN),
  usTimezone('America/Boise', MOUNTAIN),
  usTimezone('America/Phoenix', MOUNTAIN_NO_DST),
  // Pacific
  usTimezone('America/Los_Angeles', PACIFIC),
  // Alaska
  usTimezone('America/Anchorage', ALASKA),
  usTimezone('America/Juneau', ALASKA),
  usTimezone('America/Sitka', ALASKA),
  usTimezone('America/Metlakatla', ALASKA),
  usTimezone('America/Nome', ALASKA),
  usTimezone('America/Yakutat', ALASKA),
  // Hawaii-Aleutian
  usTimezone('Pacific/Honolulu', HAWAII),
  usTimezone('America/Adak', ALEUTIAN),
]
