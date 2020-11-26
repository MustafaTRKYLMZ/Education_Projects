import { State } from "./state";
import {Diagnosis, Patient, GeneralPatient } from "../types";
export type Action =
  | {
    type: "SET_PATIENT_LIST";
    payload: GeneralPatient[];
  }
  | {
    type: "SET_PATIENT";
    payload: Patient;
  }
  | {
    type: "ADD_PATIENT";
    payload: GeneralPatient;
  }
  | {
    type: "ADD_ENTRY";
    payload: Patient;
  }
  | {
    type: "SET_DIAGNOSIS_LIST";
    payload: Diagnosis[];
  }
  ;
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "SET_PATIENT":
      return {
        ...state,
        patient: { ...action.payload }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSIS_LIST":
        return {
          ...state,
          diagnoses: {
            ...action.payload.reduce(
              (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
              {}
            ),
            ...state.diagnoses
          }
        };
    case "ADD_ENTRY":
          return {
            ...state,
            patient: action.payload
       };
    default:
      return state;
  }
};

export const setPatientList = (patients: GeneralPatient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: patients
  };
};
export const setDiagnosisList = (diagnoses: Diagnosis[]):Action => {
  return {
    type:'SET_DIAGNOSIS_LIST',
    payload:diagnoses
  };
};
export const setCurrentPatient = (patient: Patient): Action => {
  return {
    type: 'SET_PATIENT',
    payload: patient
  };
};

export const addPatient = (patient: GeneralPatient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: patient
  };
};

export const addEntry = (entry: Patient): Action => {
  return {
    type: 'ADD_ENTRY',
    payload: entry
  };
};