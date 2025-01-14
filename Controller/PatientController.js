const Patient = require('../Models/PatientModel.js')
const Doctor = require('../Models/DoctorModel.js')

const createPatient = async (req,res)=>{
    const { name , age ,phone,gender,address,bloodGroup,assignedDoctor,systolicBP,diastolicBP,temperature,weight,respiratoryRate,heartRate,bmi,bloodSugarF,bloodSugarR,spo2 } = req.body
    try {
        const doctor = await Doctor.findById(assignedDoctor);
        if(!doctor){
            return res.status(404).json({error:"Doctor not found"})
        }


        //create Patient
        const newPatient = await Patient.create({
            name,
            age,
            phone,
            gender,
            address,
            bloodGroup,
            assignedDoctor,
            systolicBP,
            diastolicBP,
            temperature,
            weight,
            respiratoryRate,
            heartRate,
            bmi,
            bloodSugarF,
            bloodSugarR,
            spo2,
        });

        // update doctor's patient list
        doctor.patients.push(newPatient._id)
        await doctor.save()
        // res.redirect("/api/v1/patient/createPatient")
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

const deletePatient = async(req,res)=>{
    try {
        const {patientId} = req.params
        const patients = await Patient.findByIdAndDelete(patientId)
        if(!patients){
            res.status(404).json({error:"Patient not Found "})
        }
        res.redirect("/api/v1/patient/allPatient")
    } catch (error) {
        res.status(500).json({error:"Error occurs while deleting doctor "})
    }
}

const updatePatient = async(req,res)=>{
    try {
        const {patientId} = req.params
        const doctors = await Doctor.find()
        const patient = await Patient.findById(patientId)
        res.render('updatePatientForm' , {patient,doctors})
    } catch (error) {
        res.status(500).json({error:"Error in update "})
    }
}

const updatePatientData = async(req,res)=>{
    try {
        const { patientId } = req.params
        console.log(patientId)
        const {name,gender,age,address,phone,bloodGroup,assignedDoctor,systolicBP,diastolicBP,temperature,weight,respiratoryRate,heartRate,bmi,bloodSugarF,bloodSugarR,spo2} = req.body
        
        //Fiind the patient by ID
        const existingPatient = await Patient.findById(patientId)
        console.log(existingPatient)
        if(!existingPatient){
            return res.status(404).json({
                message:"Patient Not Found"
            })
        }

        //Check if assigned doctor has changed
        if(existingPatient.assignedDoctor.toString() !== assignedDoctor){
            const oldDoctor = await Doctor.findById(existingPatient.assignedDoctor)
            if(oldDoctor){
                oldDoctor.patients = oldDoctor.patients.filter( 
                    (id) => id.toString() !== patientId);
            }
            await oldDoctor.save()
        }

        // add the patient Id  to the new doctor's patient array
        const newDoctor = await Doctor.findById(assignedDoctor)
        if(!newDoctor){
            return res.status(404).json({ error: 'New assigned doctor not found' });
        }
        newDoctor.patients.push(patientId)
        await newDoctor.save()


        const patientUpdatedData = await Patient.findByIdAndUpdate(patientId,{name,gender,age,address,phone,bloodGroup,assignedDoctor,systolicBP,diastolicBP,temperature,weight,respiratoryRate,heartRate,bmi,bloodSugarF,bloodSugarR,spo2},{new:true,runValidators:true})

        if (!patientUpdatedData) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.redirect("/api/v1/patient/allPatient")
       


    } catch (error) {
        console.error('Error updating patient data:', error);
        res.status(500).json({error:"Error in updating Patient data "})
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

const allPatientdata = async(req,res)=>{
    try {
        const patients = await Patient.find().populate('assignedDoctor' , 'name')
        res.render('allPatient' , {patients})
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Patients', error: err });
    }
}
  
module.exports = {createPatient,getPatientsOfDoctor,patientForm , allPatientdata , deletePatient , updatePatient , updatePatientData}