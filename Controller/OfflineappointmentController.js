// const offlineappointment = require('../Models/OfflineappointmentModel.js')
const Appointment = require("../Models/OnlineappointmentModel.js")


const createOfflineappointment = async(req,res) => {
    const {Fullname, ContactNumber, AppointmentDate, AppointmentTime, Address, Injury, Note} = req.body
    try {
        const newofflineappointment = await Appointment({
            Fullname,
            ContactNumber,
            AppointmentDate,
            AppointmentTime,
            Address,
            Injury,
            Note,
        });
        await newofflineappointment.save()
        res.status(201).json({
            success: true,
            message: "offlineappointment successfully",
            Appointment:newofflineappointment
        })
    } catch (error) {
        console.log("error creating offlineappointment:", error)
        res.status(500).json({ message: "error creating offlineappointment." });
    }
}

const getAppointments= async(req,res)=>{
    try{
        const appointments = await offlineappointment.find()
        res.render('AllappointmentData',{appointments})

    }catch(error){
        res.status(500).json({message: 'Error fetching doctors', error: err});
    }
}



const createofflineappointmentform = async (req, res) => {
    try {

        res.render('offlineappointmentform')

    } catch (error) {
        res.status(500).json({ message: "Error fetching offlineappointmentform",error: err })
    }

}

module.exports = { createOfflineappointment, createofflineappointmentform,getAppointments }