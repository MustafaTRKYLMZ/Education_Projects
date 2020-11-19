import patientsData from '../../data/patients.json'
import { v4 as uuid } from 'uuid';
import toNewPatientEntry from '../utils'

import { Patient, GeneralPatient, NewPatientEntry } from '../types';


let patients: Array<Patient> = patientsData.map(obj => {
  return { id: obj.id, ...toNewPatientEntry(obj) };
});

const getEntries = (): Array<Patient> => {
  return patients;
};


const getNonSensitivePatientes = ():GeneralPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    }));
  };

  const addPatient = ( entry: NewPatientEntry ): Patient => {

    const patient: Patient = { id: uuid(), ...entry };
    patients = patients.concat(patient);
    return patient;
    };

export default {
    getNonSensitivePatientes,
    addPatient,
    getEntries,

};