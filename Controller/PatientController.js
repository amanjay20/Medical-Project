const Patient = require('../Models/PatientModel.js')
const Doctor = require('../Models/DoctorModel.js')

const createPatient = async (req,res)=>{
    const { name , age , assignedDoctor } = req.body
    try {
        const doctor = await Doctor.findById(assignedDoctor);
        if(!doctor){
            return res.status(404).json({error:"Doctor not found"})
        }


        //create Patient
        const newPatient = await Patient.create({
            name,
            age,
            assignedDoctor,
        });

        // update doctor's patient list
        doctor.patients.push(newPatient._id)
        await doctor.save()
        res.status(201).json({
            success: true,
            message: "Patient Added Successfully",
            patient:newPatient,
        })
    } catch (error) {
        console.log("error creating pateint:", error)
        res.status(500).json({ error: 'Error creating patient.' });
    }


}

// Get patients assigned to a specific doctor
const getPatientsOfDoctor = async (req, res) => {
    try {
      const { doctorId } = req.params;
  
      const doctor = await Doctor.findById(doctorId).populate('patients');
      if (!doctor) {
        return res.status(404).json({ error: 'Doctor not found.' });
      }
      res.render('doctorPatient',{doctor})
     
    } catch (error) {
      res.status(500).json({ error: 'Error fetching patients.' });
    }
  };

const patientForm = async (req,res)=>{
    try {
        const doctors = await Doctor.find()
        res.render('patientForm', {doctors})
    } catch (error) {
        res.status(500).json({ message: 'Error fetching doctors', error: err });
    }
}
  
module.exports = {createPatient,getPatientsOfDoctor,patientForm}