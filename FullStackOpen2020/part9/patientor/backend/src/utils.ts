import { NewPatientEntry, Gender,Entry,HealthCheckRating } from './types';

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
};

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
//HealthCheckRating 
const isHealthCheckRating = (param: any): boolean => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (object: any, fieldName: string): HealthCheckRating => {
  if (object[fieldName] === undefined) {
    throw new Error(`Missing field '${fieldName}'`);
  }
  if (!isHealthCheckRating(object[fieldName])) {
    throw new Error(`Incorrect health check rating '${fieldName}' : ` + object[fieldName]);
  }
  return object[fieldName] as HealthCheckRating;
};
//main line

export const toNewPatientEntry = (object: any): NewPatientEntry => {
    return {
        name: parseString(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseString(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseString(object.occupation),
        entries:[],
      };
  };

export const toNewEntry = (object:any):Entry => {
  const entryType: string = parseString(object.type);
  switch (entryType) {
    case 'Hospital':
      const hospitalEntry: Entry = {
        id: "",
        description: parseString(object.description),
        date: parseString(object.date),
        specialist: parseString(object.specialist),
        type: entryType,
        diagnosisCodes: object['diagnosisCodes'] as string[]
      };
      if (object.sickLeave) {
        hospitalEntry.sickLeave = {
          startDate: parseString(object.sickLeave),
          endDate: parseString(object.sickLeave),
        };
      }
      if (object.discharge) {
        hospitalEntry.discharge = {
          date: parseString(object.discharge),
          criteria: parseString(object.discharge),
        };
      }
      return hospitalEntry;
    case 'OccupationalHealthcare':
      const occoupationalHealthCareEntry: Entry = {
        id: "",
        description: parseString(object),
        date: parseString(object),
        specialist: parseString(object),
        employerName: parseString(object),
        type: entryType,
        diagnosisCodes: object['diagnosisCodes'] as string[]
      };
      if (object.sickLeave) {
        occoupationalHealthCareEntry.sickLeave = {
          startDate: parseString(object.sickLeave),
          endDate: parseString(object.sickLeave),
        };
      }
      return occoupationalHealthCareEntry;
    case 'HealthCheck':
      const healthCheckEntry: Entry = {
        id: "",
        description: parseString(object.description),
        date: parseString(object.date),
        specialist: parseString(object.specialist),
        type: entryType,
        healthCheckRating: parseHealthCheckRating(object, 'healthCheckRating'),
        diagnosisCodes: object['diagnosisCodes'] as string[]
      };
      return healthCheckEntry;
    default:
      throw new Error(
        `Unhandled entry type ${entryType}, object: ${JSON.stringify(object)}`
      );
  }

}
