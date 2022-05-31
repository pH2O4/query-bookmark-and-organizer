const express = require("express")
const cors = require('cors')
const app = express()
const {PrismaClient} = require('@prisma/client')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const UserControl = require('./Controlers/UserControl')
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
app.post('/RegisterConsult', UserControl.Login)

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Running in http://localhost:${PORT}`)
})