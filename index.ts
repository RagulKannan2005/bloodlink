import express from "express"
import cors from 'cors'
import './src/database/db'
import UserRouter from "./src/router/UserRouter"
import HospitalRouter from "./src/router/HospitalRouter"
import SeekerRouter from "./src/router/SeekerRouter"
import DonorRouter from "./src/router/DonorRouter"
import TestcenterRouter from "./src/router/TestcenterRouter"
import TestdetailsRouter from "./src/router/TestdetailsRouter"

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/Hospital', HospitalRouter)
app.use('/api/Seeker',SeekerRouter)
app.use('/api/Donor',DonorRouter)
app.use('/api/Testcenter',TestcenterRouter)
app.use('/api/Testdetails',TestdetailsRouter)
app.use('/api/User',UserRouter)


app.listen(8080, () => {
    console.log(`server starts at http://localhost:8080/`)
})



