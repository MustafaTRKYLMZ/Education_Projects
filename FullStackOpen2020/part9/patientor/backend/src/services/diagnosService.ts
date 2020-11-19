import diagnosData from '../../data/diagnoses'

import { Diagnose } from '../types';

const diagnoses: Array<Diagnose> = diagnosData as Array<Diagnose>;

const getAllDiagnoses = (): Array<Diagnose> => {
  return diagnoses;
};

export default {
    getAllDiagnoses
};