// const offlineappointment = require('../Models/OfflineappointmentModel.js');
const Appointment = require('../Models/OnlineappointmentModel.js')


const createAppointment = async(req,res)=>{
    const {Fullname, ContactNumber, AppointmentDate, AppointmentTime, Address,Injury,Mode} = req.body
    try{
        const newappointment = await Appointment({
            Fullname,
             ContactNumber,
             AppointmentDate, 
             AppointmentTime, 
             Address, 
             Injury,
             Mode,
             
        });
        await newappointment.save()
        res.status(201).json({
            success:true,
            message:"appointment successfully",
            appointment:newappointment
        })
    }catch(error){
        console.log("error creating appointment:",error)
        res.status(500).json({error:"error creating appointment."});
    }
};

const getAppointments= async(req,res)=>{
    try{
        // const offlineappointments = await Appointment.find()
        const appointments = await Appointment.find()
        res.render('AllappointmentData',{appointments})

    }catch(error){
        res.status(500).json({message: 'Error fetching doctors', error: err});
    }
}
module.exports = {createAppointment,getAppointments}

