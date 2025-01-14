const express = require("express")
const { createAppointment,getAppointments } = require("../Controller/OnlineAppointmentController.js")
const {createOfflineappointment,createofflineappointmentform}= require("../Controller/OfflineappointmentController.js")

const router = express.Router()

router.post('/postAppointment', createAppointment )

router.post('/postofflineappointment',createOfflineappointment )

router.get('/form',createofflineappointmentform)

router.get('/alldata',getAppointments)








module.exports = router