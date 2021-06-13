import { LINE_MAX_LENGTH } from './utils/string'
import { buildCalendar } from '.'

describe('ics/index', () => {
  it('should never write lines longer than LINE_MAX_LENGTH characters', () => {
    const cal = buildCalendar({
      name: '*'.repeat(1000),
      description: '*'.repeat(1000),
      events: [
        {
          summary: '*'.repeat(1000),
          description: '*'.repeat(1000),
          url: '*'.repeat(1000),
          location: '*'.repeat(1000),
          status: '*'.repeat(1000),
        },
      ],
    })

    const ics = cal.toString()
    const max = Math.max(...ics.split('\r\n').map((line) => line.length))
    expect(max).toBeLessThanOrEqual(LINE_MAX_LENGTH)
  })
})
