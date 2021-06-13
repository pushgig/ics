import createParameter from './parameter'
import createProperty from './property'
import createComponent from './component'

describe('ics/model/component', () => {
  it('should convert to string', () => {
    const comp = createComponent({ name: 'VTIMEZONE' })
    expect(comp.toString()).toBe('BEGIN:VTIMEZONE\r\nEND:VTIMEZONE')
  })

  it('should convert to string with properties', () => {
    const parameters = [
      createParameter({ name: 'TZID', value: 'America/Chicago' }),
      createParameter({ name: 'VALUE', value: 'foo:bar' }),
    ]

    const properties = [
      createProperty({ name: 'DTSTART', value: '2018-01-01', parameters }),
      createProperty({ name: 'DTEND', value: '2018-01-02', parameters }),
    ]

    const comp = createComponent({ name: 'VTIMEZONE', properties })
    expect(comp.toString()).toBe(
      [
        'BEGIN:VTIMEZONE',
        'DTSTART;TZID=America/Chicago;VALUE="foo:bar":2018-01-01',
        'DTEND;TZID=America/Chicago;VALUE="foo:bar":2018-01-02',
        'END:VTIMEZONE',
      ].join('\r\n'),
    )
  })
})
