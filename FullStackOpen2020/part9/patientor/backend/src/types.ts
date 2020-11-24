interface SickLeave {
  startDate: string;
  endDate: string;
}

interface Discharge {
  date: string;
  criteria: string;
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  sickLeave?: SickLeave;
  discharge?: Discharge;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;
  
export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other'
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

