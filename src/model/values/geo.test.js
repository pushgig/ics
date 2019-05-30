import { expect } from 'chai';
import createGeo from './geo';

describe('ics/model/values/geo', () => {
  it('should create a geo', () => {
    expect(createGeo({ lat: 93.339948, lng: 99.2883 }).toString()).to.equal('93.339948;99.2883');
  });
});
