import { FilmsFilterPipe } from './films-filter.pipe';

describe('FilmsFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new FilmsFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
