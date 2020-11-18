import diagnosData from '../data/diagnoses'

import { Diagnose } from '../types';

const diagnoses: Array<Diagnose> = diagnosData as Array<Diagnose>;

const getAllDiagnoses = (): Array<Diagnose> => {
  return diagnoses;
};
const addEntry = () => {
    return null;
  };

export default {
    getAllDiagnoses,
    addEntry,
};