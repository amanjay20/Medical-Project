const mongoose = require("mongoose");


const patientSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    gender:{
        type:String,
        enum: ['Male', 'Female', 'Other'],
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    bloodGroup:{
        type:String,
        enum:['A+','A-','B+','B-','AB+','AB-','O+','O-'],
        required:true,
    },
    assignedDoctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Doctor',
        required:true,
    },
    systolicBP:{
        type:String
    },
    diastolicBP:{
        type:String
    },
    temperature:{
        type:String
    },
    weight:{
        type:String
    },
    respiratoryRate:{
        type:String
    },
    heartRate:{
        type:String
    },
    bmi:{
        type:String
    },
    bloodSugarF:{
        type:String
    },
    bloodSugarR:{
        type:String
    },
    spo2:{
        type:String
    },
})
const Patient = mongoose.model('Patient',patientSchema)
module.exports = Patient;