import moment from 'moment';

export const SHORT_DATE_FORMAT = 'YYYY-MM-DD';
export const SHORT_DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:MM:SS';

export const toDate = () => moment().toDate();

export const shortDate = (
  date?: string | Date | number,
  currentFormat?: string
): string => moment(date, currentFormat).format(SHORT_DATE_FORMAT);

export const shortDateTime = (
  date?: string | Date | number,
  currentFormat?: string
): string => moment(date, currentFormat).format(SHORT_DATE_TIME_FORMAT);

export const addDays = (date: Date, addDays: number, currentFormat?: string) =>
  moment(date, currentFormat).add(addDays, 'days').toDate();
