import { expect } from 'chai';
import createDuration from './duration';

describe('ics/model/values/duration', () => {
  it('should create a duration', () => {
    expect(createDuration({ weeks: 2 }).toString()).to.equal('P14D');
    expect(createDuration({ weeks: 2, days: 2 }).toString()).to.equal('P16D');
    expect(
      createDuration({ weeks: 2, days: 2, hours: 4, minutes: 20, seconds: 20 }).toString(),
    ).to.equal('P16DT4H20M20S');
  });
});
