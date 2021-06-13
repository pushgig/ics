import createRaw from './raw'

describe('ics/model/raw', () => {
  it('should support raw ICS', () => {
    const prop = createRaw({ raw: 'VERSION:1.2.3' })
    expect(prop.toString()).toBe('VERSION:1.2.3')
  })
})
