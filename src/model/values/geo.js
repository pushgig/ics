// @flow
export type GeoProps = {
  lat: number,
  lng: number,
};

export type Geo = {
  toString: () => string,
};

export default function createGeo(props: GeoProps): Geo {
  const { lat, lng } = props;

  return {
    toString(): string {
      return `${lat};${lng}`;
    },
  };
}
