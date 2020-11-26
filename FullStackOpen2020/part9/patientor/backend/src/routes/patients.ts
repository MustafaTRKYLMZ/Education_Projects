import express from 'express';
import patientService from '../services/patientService';
import {toNewEntry, toNewPatientEntry} from '../utils';
import { Patient } from '../types'

const router = express.Router();

router.get('/', (_req, res) => {
  console.log("Everything is good for all data");
  res.send(patientService.getNonSensitivePatientes());
});

router.get('/:id', (req, res) => {

    const patient = patientService.getPatientData(req.params.id);
    if (patient) {
      res.send(patient);
    } else {
      res.status(404).end();
    }
 
});

router.get('/:id/entries', (req, res) => {
try {
  if (req.params.id) {
    const patient = patientService.getPatientData(req.params.id);
      if (patient) {
        const newEntry = toNewEntry(req.body);
        const updatedPatient: Patient = patientService.addEntry(patient, newEntry);
        res.json(updatedPatient);
      } else {
        res.status(404).end();
      }
   } else {
      res.status(404).end();
   }
} catch (e) {
  res.status(400).send(e.message)
}

});


router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }

});


export default router;