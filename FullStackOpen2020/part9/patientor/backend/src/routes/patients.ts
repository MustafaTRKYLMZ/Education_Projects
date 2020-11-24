import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  console.log("Everything is good for all data");
  res.send(patientService.getNonSensitivePatientes());
});

router.get('/:id', (req, res) => {

    const patient = patientService.getPatientData(req.params.id);
    if (patient) {
      console.log("Data responted for ID");
      console.log("Data for patient list", patient);
      res.send(patient);
    } else {
      res.status(404).end();
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