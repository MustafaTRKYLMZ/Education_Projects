import React from "react";
import axios from "axios";
import GenderIcon from "../components/GenderIcon";
import { useStateValue,addEntry } from "../state";
import { EntryFormValues } from '../AddPatientModal/AddEntryForm';
import EntryDetails from "../components/EntryDetails";
import {AddEntryModal} from '../AddPatientModal';
import { Button } from 'semantic-ui-react';
import {Entry, Patient,EntryTypes,entryTypeToName } from '../types';
import { apiBaseUrl } from '../constants';
import { useHistory } from "react-router-dom";


const EntryInitialValues = (entryType:EntryTypes) :Entry =>{
  switch (entryType) {
    case "HealthCheck":
      return {
        id: "",
        type: "HealthCheck",
        description: "",
        date: "",
        specialist: "",
        healthCheckRating: 0
      };
    case "Hospital":
      return {
        id: "",
        type: "Hospital",
        description: "",
        date: "",
        specialist: ""
      };
    case "OccupationalHealthcare":
      return {
        id: "",
        type: "OccupationalHealthcare",
        description: "",
        date: "",
        specialist: "",
        employerName: ""
      };
  }
  
}

const PatientPage: React.FC = () => {
  const [{ patient }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const [entryType,setEntryType] = React.useState<EntryTypes>("HealthCheck");
  const history = useHistory();

  if (!patient) {
    history.push("/");
    return null;
  }


  const openModal = (entryType: EntryTypes): void => {
    setEntryType(entryType);
    setModalOpen(true);
  };

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry= async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${patient.id}/entries`,
        values
      );
      dispatch(addEntry(newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  return (
    <div>
      <h1>{patient.name}<GenderIcon gender={patient.gender} /></h1>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>

      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
        initialValue={EntryInitialValues(entryType)}
      />
      <Button onClick={() => openModal("HealthCheck")}>Add {entryTypeToName("HealthCheck")} entry</Button>
      <Button onClick={() => openModal("Hospital")}>Add {entryTypeToName("Hospital")} entry</Button>
      <Button onClick={() => openModal("OccupationalHealthcare")}>Add {entryTypeToName("OccupationalHealthcare")} entry</Button>
      <h2>entries</h2>
      {patient.entries.length > 0 ?
        patient.entries.map((entry: Entry) => (
            <EntryDetails  key={entry.id} entry={entry}/>
        ))
        :
        <div>No entries</div>
      }
      <div>
      
      </div>
     
    </div>
  );
};

export default PatientPage;