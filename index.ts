import express from "express"
import cors from 'cors'
import './src/database/db'
import db from "./src/database/db"
import UserRouter from "./src/router/UserRouter"
import HospitalRouter from "./src/router/HospitalRouter"
import { HospitalSchema } from "./src/database/schema/HospitalSchema"

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/User', UserRouter)
app.use('/api/Hospital', HospitalRouter)
app.listen(8080, () => {
    console.log(`server starts at http://localhost:8080/`)
})

