// @flow
import { joinLines } from '../../utils/string';
import { type Component, componentsToString, VTIMEZONE, BEGIN, END } from '../component';
import { type Property, propertiesToString } from '../property';

export type TimeZoneProps = {
  properties: Property[],
  observances: Component[],
};

export type TimeZone = {
  toString: () => string,
};

export function timeZonesToString(timezones: TimeZone[]): string {
  return joinLines(timezones.map(tz => tz.toString()));
}

export default function createTimeZone(props: TimeZoneProps): TimeZone {
  const { properties = [], observances = [] } = props;

  return {
    toString() {
      return joinLines([
        `${BEGIN}:${VTIMEZONE}`,
        propertiesToString(properties),
        componentsToString(observances),
        `${END}:${VTIMEZONE}`,
      ]);
    },
  };
}
