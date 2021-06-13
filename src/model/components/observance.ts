import createComponent, { Component, ComponentProps } from '../component'

export const DAYLIGHT = 'DAYLIGHT'
export const STANDARD = 'STANDARD'

export type ObservanceProps = ComponentProps
export type Observance = Component

export default function createObservance(props: ObservanceProps): Observance {
  return createComponent(props)
}
