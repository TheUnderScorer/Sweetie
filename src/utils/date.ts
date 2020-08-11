import moment from 'moment';

export const daysInWeek = 7;

export const getRemainingDaysInWeek = () => daysInWeek - moment().weekday();
