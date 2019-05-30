import createParameter from './parameter';
import createProperty, { propertiesToString } from './property';

describe('ics/model/property', () => {
  it('should convert to string', () => {
    const prop = createProperty({ name: 'VERSION', value: '1.2.3' });
    expect(prop.toString()).toBe('VERSION:1.2.3');
  });

  it('should convert to escaped string', () => {
    const prop = createProperty({ name: 'SUMMARY', value: 'this; that' });
    expect(prop.toString()).toBe('SUMMARY:this\\; that');
  });

  it('should support complex values', () => {
    const value = {
      toString: () => 'this; that',
    };

    const prop = createProperty({ name: 'SUMMARY', value });
    expect(prop.toString()).toBe('SUMMARY:this\\; that');
  });

  it('should convert to string with parameters', () => {
    const parameters = [
      createParameter({ name: 'TZID', value: 'America/Chicago' }),
      createParameter({ name: 'VALUE', value: 'foo:bar' }),
    ];

    const prop = createProperty({ name: 'DTSTART', value: '2018-01-01', parameters });
    expect(prop.toString()).toBe('DTSTART;TZID=America/Chicago;VALUE="foo:bar":2018-01-01');
  });

  it('should convert properties to string', () => {
    const props = [
      createProperty({ name: 'VERSION', value: '1.2.3' }),
      createProperty({ name: 'SUMMARY', value: 'this; that' }),
    ];

    expect(propertiesToString(props)).toBe('VERSION:1.2.3\r\nSUMMARY:this\\; that');
  });
});
