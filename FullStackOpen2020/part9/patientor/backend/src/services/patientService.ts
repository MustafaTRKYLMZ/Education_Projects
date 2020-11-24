import patientsData from '../../data/patients'
import { v4 as uuid } from 'uuid';
import toNewPatientEntry from '../utils'

import { Patient, NewPatientEntry } from '../types';


let patients: Array<Patient> = patientsData.map(obj => {
  return { id: obj.id, ...toNewPatientEntry(obj), entries: obj.entries };
});

const getEntries = (): Array<Patient> => {
  return patients;
};

const getPatientData = (id: string): Patient|undefined => {
///İt is a problem getting data with ID
console.log("getting data")
  const entry = patients.find(d => d.id === id);
  return entry;
};


const getNonSensitivePatientes = ():Omit<Patient, 'ssn' | 'entries'>[] => {
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
    getPatientData,

};