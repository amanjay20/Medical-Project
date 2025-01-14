const express = require("express")
const {createPatient,getPatientsOfDoctor, patientForm, allPatientdata, deletePatient, updatePatient, updatePatientData} = require("../Controller/PatientController.js")
const Doctor = require("../Models/DoctorModel.js")



const router = express.Router()

router.post('/createPatient' , createPatient )

router.get('/getPatientsOfDoctor/:doctorId' , getPatientsOfDoctor)

router.get('/patient-form', patientForm);


router.get('/allPatient' , allPatientdata)


router.get("/deletePatient/:patientId" , deletePatient)


router.get('/update/:patientId' , updatePatient)

router.post("/updatePatientdata/:patientId" , updatePatientData)
module.exports = router