import createDateTime from './datetime';

describe('ics/model/values/datetime', () => {
  it('should create a DateTime', () => {
    expect(createDateTime({ utc: '2018-06-30T22:08:11.996Z' }).toString()).toBe('20180630T220811');
    expect(createDateTime({ local: '2018-06-30T22:08:11.996' }).toString()).toBe('20180630T220811');
  });
});
