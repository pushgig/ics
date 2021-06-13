import { Duration as LuxDuration } from 'luxon'

export type DurationProps = {
  weeks?: number
  days?: number
  hours?: number
  minutes?: number
  seconds?: number
}

export type Duration = {
  toString: () => string
}

export default function createDuration(props: DurationProps): Duration {
  const duration = LuxDuration.fromObject(props)

  if (!duration.isValid) {
    throw new TypeError('Invalid duration')
  }

  return {
    toString() {
      return duration.toISO()
    },
  }
}
