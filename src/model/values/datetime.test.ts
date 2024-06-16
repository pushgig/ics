import { parametersToString } from '../parameter'
import createDateTime from './datetime'

describe('ics/model/values/datetime', () => {
  it('should create a DateTime', () => {
    expect(createDateTime({ utc: '2018-06-30T22:08:11.996Z' }).toString()).toBe('20180630T220811')
    expect(createDateTime({ local: '2018-06-30T22:08:11.996' }).toString()).toBe('20180630T220811')

    expect(createDateTime({ utc: '2018-06-30T22:08:11.996Z' }).parameters).toEqual([])
    expect(createDateTime({ local: '2018-06-30T22:08:11.996' }).parameters).toEqual([])
  })

  it('should create a Date with parameters', () => {
    const date = '2024-06-16'
    const utc = createDateTime({ utc: date })
    const local = createDateTime({ local: date })

    expect(utc.toString()).toBe('')
    expect(parametersToString(utc.parameters)).toBe(';VALUE=DATE:20240616')

    expect(local.toString()).toBe('')
    expect(parametersToString(local.parameters)).toBe(';VALUE=DATE:20240616')
  })
})
