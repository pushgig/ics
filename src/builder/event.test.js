import buildEvent from './event'

describe('ics/builder/event', () => {
  it('should build an event', () => {
    const cal = buildEvent({
      uid: 'abc-123',
      summary: 'New Event',
      description: 'Daft Punk is playing at my house',
      location: 'My house',
      status: 'TENTATIVE',
      meta: {
        profileId: 'profile123',
      },
      start: {
        local: '2018-01-01T20:00:00',
      },
      end: {
        local: '2018-01-02T02:00:00',
      },
      timeZone: 'America/Chicago',
      geo: {
        lat: '55.5555',
        lng: '66.6666',
      },
      url: 'http://pushgig.com',
    })

    expect(cal.toString()).toBe(
      [
        'BEGIN:VEVENT',
        'UID:abc-123',
        'SUMMARY:New Event',
        'DESCRIPTION:Daft Punk is playing at my house',
        'LOCATION:My house',
        'STATUS:TENTATIVE',
        'DTSTART;TZID=America/Chicago:20180101T200000',
        'DTEND;TZID=America/Chicago:20180102T020000',
        'GEO:55.5555;66.6666',
        'URL:http://pushgig.com',
        'X-META-PROFILEID:profile123',
        'END:VEVENT',
      ].join('\r\n'),
    )
  })
})
