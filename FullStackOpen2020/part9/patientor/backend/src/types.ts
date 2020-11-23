export interface Entry {}

export enum Gender {
  male = 'male',
  female = 'female',
  other = 'other'
}


  export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
  }
  
  export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries:Entry[];
  }

  export type NewPatientEntry = Omit<Patient, 'id'>;
  export type GeneralPatient = Omit<Patient, 'ssn'| 'entries'>;

