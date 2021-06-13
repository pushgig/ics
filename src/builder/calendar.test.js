import buildCalendar from './calendar'

describe('ics/builder/calendar', () => {
  it('should build a calendar', () => {
    const cal = buildCalendar({
      name: 'Test Calendar',
      description: 'This is a test calendar',
      meta: {
        profileId: 'profile123',
      },
      events: [
        {
          uid: 'abc-123',
          summary: 'New Event',
          description: 'Daft Punk is playing at my house',
          location: 'My house',
          status: 'TENTATIVE',
          start: {
            local: '2018-01-01T20:00:00',
          },
          end: {
            utc: '2018-01-02T02:00:00Z',
          },
          timeZone: 'America/Chicago',
          geo: {
            lat: '55.5555',
            lng: '66.6666',
          },
        },
      ],
    })

    expect(cal.toString()).toBe(
      [
        'BEGIN:VCALENDAR',
        'PRODID:pushgig-ics',
        'VERSION:2.0',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'X-PUBLISHED-TTL:PT1H',
        'X-WR-CALNAME:Test Calendar',
        'X-WR-CALDESC:This is a test calendar',
        'X-META-PROFILEID:profile123',
        'BEGIN:VTIMEZONE',
        'TZID:America/Chicago',
        'X-LIC-LOCATION:America/Chicago',
        'BEGIN:DAYLIGHT',
        'TZOFFSETFROM:-0600',
        'TZOFFSETTO:-0500',
        'TZNAME:CDT',
        'DTSTART:19700308T020000',
        'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU',
        'END:DAYLIGHT',
        'BEGIN:STANDARD',
        'TZOFFSETFROM:-0500',
        'TZOFFSETTO:-0600',
        'TZNAME:CST',
        'DTSTART:19701101T020000',
        'RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU',
        'END:STANDARD',
        'END:VTIMEZONE',
        'BEGIN:VEVENT',
        'UID:abc-123',
        'SUMMARY:New Event',
        'DESCRIPTION:Daft Punk is playing at my house',
        'LOCATION:My house',
        'STATUS:TENTATIVE',
        'DTSTART;TZID=America/Chicago:20180101T200000',
        'DTEND;TZID=America/Chicago:20180102T020000',
        'GEO:55.5555;66.6666',
        'END:VEVENT',
        'END:VCALENDAR',
      ].join('\r\n'),
    )
  })

  it('should throw on invalid timezone', () => {
    expect(() =>
      buildCalendar({
        name: 'Test Calendar',
        description: 'This is a test calendar',
        events: [
          {
            uid: 'abc-123',
            summary: 'New Event',
            start: '2018-01-01T20:00:00',
            timeZone: 'Bad/Timezone',
          },
        ],
      }),
    ).toThrowError()
  })
})
