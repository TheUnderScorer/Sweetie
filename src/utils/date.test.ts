import { schedule } from './date';
import { wait } from './wait';
import moment from 'moment';

describe('schedule', () => {
  it('should trigger function on date', async () => {
    let triggered = false;
    const callback = () => {
      triggered = true;
    };

    const date = moment().add(3, 'seconds');

    schedule(date, callback);

    await wait(4000);

    expect(triggered).toBeTruthy();
  });
});
