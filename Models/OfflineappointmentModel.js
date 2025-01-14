const mongoose = require('mongoose');
const offlineappointmentSchema = new mongoose.Schema({
    Fullname:{
        type:String,
        required:true
    },
    ContactNumber:{
        type:Number,
        min:10 },
    AppointmentDate:{
        type:Date,
        required:true,
     
    },
    AppointmentTime:{
        type:Date,
        required:true,
        match:new Date('1970-01-01T09:30:00Z')
    },
    Address:{
        type:String,
        required:true
    },
    Injury:{
        type:String,
        required:true
    },
    Note:{
        type:String,
       
    }
    
    });
       const Appointment = mongoose.model('appointment',offlineappointmentSchema)
       module.exports = Appointment;