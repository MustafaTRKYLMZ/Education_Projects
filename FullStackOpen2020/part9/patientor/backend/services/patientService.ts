import patientesData from '../data/patients'

import { Patient } from '../types';


const patients: Array<Patient> = patientesData;
const getEntries = (): Array<Patient> => {
    return patients;
  };

const getNonSensitivePatientes = (): Omit<Patient, 'ssn'>[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    }));
  };


  const addEntry = () => {
    return null;
  };

export default {
    getNonSensitivePatientes,
    addEntry,
    getEntries,
};