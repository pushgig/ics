import { joinLines } from '../utils/string'
import createProperty, { Property, PropertyProps, propertiesToString } from './property'

export const BEGIN = 'BEGIN'
export const END = 'END'
export const VEVENT = 'VEVENT'
export const VTODO = 'VTODO'
export const VJOURNAL = 'VJOURNAL'
export const VFREEBUSY = 'VFREEBUSY'
export const VTIMEZONE = 'VTIMEZONE'
export const VALARM = 'VALARM'
export const VAVAILABILITY = 'VAVAILABILITY'
export const VVENUE = 'VVENUE'
export const AVAILABLE = 'AVAILABLE'
export const EXPERIMENTAL_PREFIX = 'X-'

export type ComponentProps = {
  name: string
  properties?: Property[]
}

export type Component = {
  addProperty: (PropertyProps) => Property
  toString: () => string
}

export function componentsToString(components: Component[]): string {
  return joinLines(components.map((comp) => comp.toString()))
}

export default function createComponent(props: ComponentProps): Component {
  const { name, properties = [] } = props

  return {
    addProperty(prop: PropertyProps): Property {
      const property = createProperty(prop)
      properties.push(property)
      return property
    },
    toString() {
      return joinLines([`${BEGIN}:${name}`, propertiesToString(properties), `${END}:${name}`])
    },
  }
}
