const express = require("express")
const { createDoctor, getDoctors, doctorForm } = require("../Controller/DoctorController.js")

const router = express.Router()


router.post('/postdoctor', createDoctor)


router.get('/getDoctor', getDoctors)

router.get('/doctorForm', doctorForm)


module.exports = router ;