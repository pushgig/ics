import createParameter, { parametersToString } from './parameter'

describe('ics/model/parameter', () => {
  it('should convert to string', () => {
    const param = createParameter({ name: 'TZID', value: 'America/Chicago' })
    expect(param.toString()).toBe('TZID=America/Chicago')
  })

  it('should convert to quoted string', () => {
    const param = createParameter({ name: 'VALUE', value: 'foo:bar' })
    expect(param.toString()).toBe('VALUE="foo:bar"')
  })

  it('should convert parameters to string', () => {
    const params = [
      createParameter({ name: 'TZID', value: 'America/Chicago' }),
      createParameter({ name: 'VALUE', value: 'foo:bar' }),
    ]

    expect(parametersToString(params)).toBe(';TZID=America/Chicago;VALUE="foo:bar"')
  })

  it('should include type', () => {
    const params = [
      createParameter({ name: 'VALUE', value: '20240616', type: 'DATE' }),
      createParameter({ name: 'VALUE', value: 'foo:bar', type: 'DATE' }),
    ]

    expect(parametersToString(params)).toBe(';VALUE=DATE:20240616;VALUE=DATE:"foo:bar"')
  })
})
