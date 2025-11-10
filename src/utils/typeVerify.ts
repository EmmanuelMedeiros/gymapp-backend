import dayjs from 'dayjs';
import { HttpResponse } from './httpResponses';

const typeVerify = (input: any, type: 'date' | 'string' | 'number'): boolean => {
  if (!input) {
    return false;
  }
  try {
    switch(type) {
      case 'date': 
        return isDate(input);
      case 'string':
        return typeof input === 'string';
      case 'number': 
        return typeof Number(input) === 'number';
      default: 
        return false;
    }
  } catch (err) {
    throw HttpResponse.badRequest({
      message: "The type of input does not attend the requirements."
    })
  }
}

const isDate = (input: string): boolean => {
  const dateParse = Date.parse(input);
  if (!dateParse) {
    return false;
  }
  return true;
}