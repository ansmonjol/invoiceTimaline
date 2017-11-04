import { Format } from './format';

describe('Format', () => {
  it('calls componentDidMount', () => {
    Format.pad('ddd', 10, 2);
  });
});
