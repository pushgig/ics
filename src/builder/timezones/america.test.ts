import { DateTime, IANAZone } from 'luxon'
import timezones from './america'

function offsetToMinutes(offset: string): number {
  const sign = offset.startsWith('-') ? -1 : 1
  const hours = parseInt(offset.slice(1, 3), 10)
  const minutes = parseInt(offset.slice(3, 5), 10)
  return sign * (hours * 60 + minutes)
}

describe('ics/builder/timezones/america', () => {
  it('has no duplicate ids', () => {
    const ids = timezones.map((tz) => tz.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  timezones.forEach((tz) => {
    describe(tz.id, () => {
      it('is a valid IANA zone', () => {
        expect(IANAZone.isValidZone(tz.id)).toBe(true)
      })

      it('declares a VTIMEZONE for its own id', () => {
        expect(tz.raw).toContain('BEGIN:VTIMEZONE')
        expect(tz.raw).toContain('END:VTIMEZONE')
        expect(tz.raw).toContain(`TZID:${tz.id}`)
      })

      it('matches the zone’s real winter and summer offsets', () => {
        const std = tz.raw.match(/BEGIN:STANDARD[\s\S]*?TZOFFSETTO:([+-]\d{4})/)
        const dst = tz.raw.match(/BEGIN:DAYLIGHT[\s\S]*?TZOFFSETTO:([+-]\d{4})/)
        expect(std).not.toBeNull()

        const winter = DateTime.fromISO('2026-01-15T12:00', { zone: tz.id }).offset
        const summer = DateTime.fromISO('2026-07-15T12:00', { zone: tz.id }).offset

        expect(offsetToMinutes(std![1])).toBe(winter)
        expect(offsetToMinutes(dst ? dst[1] : std![1])).toBe(summer)
      })
    })
  })
})
