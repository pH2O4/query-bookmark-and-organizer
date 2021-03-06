const express = require("express")
const cors = require('cors')
const app = express()
const {PrismaClient} = require('@prisma/client')
const jwt = require('jsonwebtoken')

const UserControl = require('./Controlers/UserControl')
const ConsultsAndRegisters = require('./Controlers/ConsultsRegister')
const middlewareCheckJWT = UserControl.middlewareCheckJWT
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
const prisma = new PrismaClient()

//Login Detais
app.post('/Login', UserControl.Login)
app.post('/Recovery', UserControl.RecoveryPass) 
app.get('/AuthStatus',middlewareCheckJWT, UserControl.StatusAuth)

//Consult Detais
app.post('/RegisterConsult', middlewareCheckJWT, ConsultsAndRegisters.Consult)
app.post('/SeeDayConsult', middlewareCheckJWT, ConsultsAndRegisters.SeeContultForDay)
app.get('/SeeAllConsuts', middlewareCheckJWT, ConsultsAndRegisters.SeeAllConsults)
app.get('/SeeAllUsers', middlewareCheckJWT, ConsultsAndRegisters.SeeAllUsers)
app.post('/GetConsultById', middlewareCheckJWT, ConsultsAndRegisters.SeeConsultById)
app.post('/UpdateConsultDatas', middlewareCheckJWT, ConsultsAndRegisters.UpdateConsultDatas)
//Register Detais
app.post('/RegisteroOperation', middlewareCheckJWT, ConsultsAndRegisters.Operations)
app.get('/ContultOperations', ConsultsAndRegisters.OperationsConsult)
app.post('/RegisteroWokers', middlewareCheckJWT, ConsultsAndRegisters.Workers)
app.get('/ConsultRegisteroWokers',  ConsultsAndRegisters.ConsultWorkers)
app.post('/UpdateUsersDatas',  middlewareCheckJWT, ConsultsAndRegisters.UpdateUsersDatas)
app.post('/TradeAdminAndPassStatus',middlewareCheckJWT, ConsultsAndRegisters.TradeAdminAndPassStatus)
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Running in http://localhost:${PORT}`)
})