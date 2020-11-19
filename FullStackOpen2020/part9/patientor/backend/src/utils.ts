import { NewPatientEntry, Gender } from './types';

//string provided
//String line 

const isString =(text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseString =(comment:any):string => {

    if (!comment || !isString(comment)) {
        throw new Error('Incorrect or missing: ' + comment);
      }
      return comment;
}

//date line
const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };
  
  const parseDate = (date: any,): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
      }
      return date;
  };



//Gender line
  const isGender = (param: any): boolean => {
    return Object.values(Gender).includes(param);
  };
  
  const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
      }
      return gender;
  };

//main line

const toNewPatientEntry = (object: any): NewPatientEntry => {
    return {
        name: parseString(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseString(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseString(object.occupation),
      };
  };



export default toNewPatientEntry;
