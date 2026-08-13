import { parametersToString } from '../parameter'
import createDateTime from './datetime'

describe('ics/model/values/datetime', () => {
  it('should create a DateTime', () => {
    expect(createDateTime({ utc: '2018-06-30T22:08:11.996Z' }).toString()).toBe('20180630T220811')
    expect(createDateTime({ local: '2018-06-30T22:08:11.996' }).toString()).toBe('20180630T220811')

    expect(createDateTime({ utc: '2018-06-30T22:08:11.996Z' }).parameters).toEqual([])
    expect(createDateTime({ local: '2018-06-30T22:08:11.996' }).parameters).toEqual([])

    expect(createDateTime({ utc: '2018-06-30T22:08:11.996Z' }).isDateOnly).toBe(false)
    expect(createDateTime({ local: '2018-06-30T22:08:11.996' }).isDateOnly).toBe(false)
  })

  it('should create a date-only value with a VALUE=DATE parameter', () => {
    const date = '2024-06-16'
    const utc = createDateTime({ utc: date })
    const local = createDateTime({ local: date })

    expect(utc.isDateOnly).toBe(true)
    expect(utc.toString()).toBe('20240616')
    expect(parametersToString(utc.parameters)).toBe(';VALUE=DATE')

    expect(local.isDateOnly).toBe(true)
    expect(local.toString()).toBe('20240616')
    expect(parametersToString(local.parameters)).toBe(';VALUE=DATE')
  })
})
