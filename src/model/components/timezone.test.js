import createParameter from '../parameter';
import createProperty from '../property';
import createComponent from '../component';
import createTimeZone from './timezone';

describe('ics/model/components/timezone', () => {
  it('should convert to string', () => {
    const zone = createTimeZone({});
    expect(zone.toString()).toBe('BEGIN:VTIMEZONE\r\nEND:VTIMEZONE');
  });

  it('should convert to string with properties', () => {
    const parameters = [
      createParameter({ name: 'TZID', value: 'America/Chicago' }),
      createParameter({ name: 'VALUE', value: 'foo:bar' }),
    ];

    const properties = [
      createProperty({ name: 'DTSTART', value: '2018-01-01', parameters }),
      createProperty({ name: 'DTEND', value: '2018-01-02', parameters }),
    ];

    const observances = [
      createComponent({
        name: 'DAYLIGHT',
        properties: [
          createProperty({ name: 'TZOFFSETFROM', value: '-0500' }),
          createProperty({ name: 'TZOFFSETTO', value: '-0400' }),
        ],
      }),
    ];

    const zone = createTimeZone({ properties, observances });
    expect(zone.toString()).toBe(
      [
        'BEGIN:VTIMEZONE',
        'DTSTART;TZID=America/Chicago;VALUE="foo:bar":2018-01-01',
        'DTEND;TZID=America/Chicago;VALUE="foo:bar":2018-01-02',
        'BEGIN:DAYLIGHT',
        'TZOFFSETFROM:-0500',
        'TZOFFSETTO:-0400',
        'END:DAYLIGHT',
        'END:VTIMEZONE',
      ].join('\r\n'),
    );
  });
});
