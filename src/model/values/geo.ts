export type GeoProps = {
  lat: number | string
  lng: number | string
}

export type Geo = {
  toString: () => string
}

export default function createGeo(props: GeoProps): Geo {
  const { lat, lng } = props

  return {
    toString(): string {
      return `${lat.toString()};${lng.toString()}`
    },
  }
}
