import moment, { Moment } from 'moment';

export const daysInWeek = 7;

export const getRemainingDaysInWeek = () => daysInWeek - moment().weekday();

export const isEndOfWeek = () => moment().weekday() === 0;

export const getEndOfWeek = () => moment().endOf('week').add('1', 'day');

export const schedule = (date: Moment, callback: (date: Moment) => any) => {
  const now = moment();

  if (now.isSameOrAfter(date)) {
    throw new TypeError('Date must be placed in future.');
  }

  const diff = date.diff(now, 'milliseconds');

  const timeoutId = setTimeout(() => {
    callback(moment());
  }, diff);

  return () => {
    clearTimeout(timeoutId);
  };
};
