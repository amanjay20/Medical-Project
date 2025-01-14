const Doctor = require("../Models/DoctorModel.js");

const createDoctor = async (req, res) => {
  const {
    name,
    email,
    phone,
    dateOfBirth,
    designation,
    degree,
    gender,
    department,
    speciality,
    experience,
    servicePlace,
    address,
  } = req.body;
  try {
    const newdoctor = await Doctor.create({
      name,
      email,
      phone,
      dateOfBirth,
      designation,
      gender,
      degree,
      department,
      speciality,
      experience,
      servicePlace,
      address,
    });
    console.log("doctor Added");
    res.status(201).send({
      success: true,
      message: "Doctor Added Successfully",
      newdoctor,
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating doctor." });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const doctors = await Doctor.findByIdAndDelete(doctorId);
    console.log(doctors);
    if (!doctors) {
      res.status(404).json({ error: "Doctor not found" });
    }
    res.redirect("/api/v1/doctor/getDoctor");
  } catch (error) {
    res.status(500).json({ errors: "error doctor Id" });
  }
};

const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.render("index", { doctors });
  } catch (error) {
    res.status(500).json({ error: "Error fetching doctors." });
  }
};

const updateDoctor = async(req,res)=>{
  
  try {
    const {doctorId} = req.params
    const doctor = await Doctor.findById(doctorId)
    if(!doctor){
      res.status(404).json({error:"Doctor not found"})
    }
    res.render('updateDoctorForm', {doctor})
  } catch (error) {
    res.status(500).json({ errors: "Updating doctor form error" });
  }
}

const updateDoctordata = async(req,res)=>{
  try {
    
    const {id} = req.params
    const {name,email,phone,dateOfBirth,designation,degree,gender,department,speciality,experience,servicePlace,address} = req.body
    const doctorUpdatedDate = await Doctor.findByIdAndUpdate(id,{name,email,phone,dateOfBirth,designation,degree,gender,department,speciality,experience,servicePlace,address})
    await doctorUpdatedDate.save()
    res.redirect('/api/v1/doctor/getDoctor')
  } catch (error) {
    res.status(500).json({ errors: "error updating doctor data " });
  }
}
const doctorForm = async (req, res) => {
  try {
    res.render("doctorForm");
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctorForm", error: err });
  }
};

module.exports = { createDoctor, getDoctors, doctorForm, deleteDoctor , updateDoctor , updateDoctordata };
