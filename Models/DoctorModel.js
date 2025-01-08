const mongoose = require("mongoose");


const doctorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    specialization:{
        type:String,
        required:true,
    },
    yearsOfExperience:{
        type:Number,
        required:true,
    },
    patients:[{type:mongoose.Schema.Types.ObjectId, ref:'Patient'}]
})
const Doctor = mongoose.model('Doctor',doctorSchema)
module.exports = Doctor;