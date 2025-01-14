const mongoose =require('mongoose')
const appointmentSchema = new mongoose.Schema({
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
       
    },
    Mode:{
        type:String,
        enum:['online','offline'],
        required:true
    }

})
   const Appointment = mongoose.model('appointment',appointmentSchema)
   module.exports = Appointment;