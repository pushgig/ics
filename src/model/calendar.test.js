import { expect } from 'chai';
import createParameter from './parameter';
import createProperty from './property';
import createCalendar from './calendar';

describe('ics/model/calendar', () => {
  it('should convert to string', () => {
    const cal = createCalendar({});
    expect(cal.toString()).to.equal('BEGIN:VCALENDAR\r\nEND:VCALENDAR');
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

    const cal = createCalendar({ properties });
    expect(cal.toString()).to.equal(
      [
        'BEGIN:VCALENDAR',
        'DTSTART;TZID=America/Chicago;VALUE="foo:bar":2018-01-01',
        'DTEND;TZID=America/Chicago;VALUE="foo:bar":2018-01-02',
        'END:VCALENDAR',
      ].join('\r\n'),
    );
  });
});
