const Doctor = require("../Models/DoctorModel.js");

const createDoctor = async (req, res) => {
  const { name, specialization, yearsOfExperience } = req.body;
  try {
    const newdoctor = await Doctor.create({
      name,
      specialization,
      yearsOfExperience,
    });

    console.log("doctor ");
    res.status(201).send({
      success: true,
      message: "Doctor Added Successfully",
      newdoctor,
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating doctor." });
  }
};

const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.render('index', {doctors})
  } catch (error) {
    res.status(500).json({ error: "Error fetching doctors." });
  }
};

const doctorForm = async(req,res)=>{
    try {
        res.render('doctorForm')
    } catch (error) {
        res.status(500).json({message:"Error fetching doctorForm", error:err})
    }
}

module.exports = { createDoctor, getDoctors , doctorForm };
