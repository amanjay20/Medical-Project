const express = require("express")
const { createDoctor, getDoctors, doctorForm, deleteDoctor, updateDoctor, updateDoctordata } = require("../Controller/DoctorController.js")

const router = express.Router()


router.post('/postdoctor', createDoctor)


router.get('/getDoctor', getDoctors)

router.get('/deleteDoctor/:doctorId' , deleteDoctor )

router.get('/update/:doctorId' , updateDoctor)

router.post('/updateDoctordata/:id' , updateDoctordata )

router.get('/doctorForm', doctorForm)


module.exports = router ;