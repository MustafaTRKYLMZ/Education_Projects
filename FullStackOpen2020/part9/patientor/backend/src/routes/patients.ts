import express from 'express';
import patientService from '../services/patientService'
import toNewPatientEntry from '../utils'

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientes());
})


router.post('/', (req, res) => {
  console.log("Here is router")
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
console.log('reguest-------------->>>>>',newPatientEntry)
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }

});


export default router;