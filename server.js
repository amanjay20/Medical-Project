const express = require('express')
const dotenv = require('dotenv')
const morgan = require("morgan")
const path = require("path")
const connectDB = require('./config/db.js')

const doctorRoutes = require("./Routes/doctorRoutes.js")
const patientRoutes = require("./Routes/patientRoutes.js")
const appointmentRoutes = require('./Routes/appointmentRoutes.js')


dotenv.config()

connectDB()

const app = express()

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));  // For form submissions



app.use(express.json())
app.use(morgan('dev'))


app.use("/api/v1/doctor", doctorRoutes)
app.use("/api/v1/patient" , patientRoutes)
app.use("/api/v1/appointment", appointmentRoutes)


const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`serverjs server in running ${process.env.DEV_MODE} mode on Port no ${PORT}`)
})
