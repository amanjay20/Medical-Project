const mongoose = require("mongoose");


const doctorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phone:{
        type:Number,
        required:true,
        maxlength:10
    },
    dateOfBirth: {
        type: String, // Change from Date to String
        required: true,
        validate: {
            validator: function(v) {
                // Regular expression to validate the date format yyyy-mm-dd
                return /^\d{4}-\d{2}-\d{2}$/.test(v);
            },
            message: props => `${props.value} is not a valid date format!`
        }
    },

    designation:{
        type:String,
        required:true,
    },
    degree:{
        type:String,
        required:true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'], // Restricts the value to the specified options
        required: true, // Makes the field mandatory
    },
    department:{
        type:String,
    },
    speciality:{
        type:String,
    },
    experience:{
        type:String,
    },
    servicePlace:{
        type:String,
    },
    address:{
        type:String,
    },
    patients:[{type:mongoose.Schema.Types.ObjectId, ref:'Patient'}]
})
const Doctor = mongoose.model('Doctor',doctorSchema)
module.exports = Doctor;