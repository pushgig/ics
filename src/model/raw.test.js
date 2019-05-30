import { expect } from 'chai';
import createRaw from './raw';

describe('ics/model/raw', () => {
  it('should support raw ICS', () => {
    const prop = createRaw({ raw: 'VERSION:1.2.3' });
    expect(prop.toString()).to.equal('VERSION:1.2.3');
  });
});
