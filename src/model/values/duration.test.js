import createDuration from './duration';

describe('ics/model/values/duration', () => {
  it('should create a duration', () => {
    expect(createDuration({ weeks: 2 }).toString()).toBe('P2W');
    expect(createDuration({ weeks: 2, days: 2 }).toString()).toBe('P2W2D');
    expect(
      createDuration({ weeks: 2, days: 2, hours: 4, minutes: 20, seconds: 20 }).toString(),
    ).toBe('P2W2DT4H20M20S');
  });
});
