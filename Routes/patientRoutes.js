const express = require("express")
const {createPatient,getPatientsOfDoctor, patientForm} = require("../Controller/PatientController.js")
// const {}= require("../Models/DoctorModel.js")


const router = express.Router()

router.post('/createPatient' , createPatient )

router.get('/getPatientsOfDoctor/:doctorId' , getPatientsOfDoctor)

router.get('/patient-form', patientForm);

module.exports = router