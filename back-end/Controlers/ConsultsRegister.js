const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

module.exports.Consult = async(req, res) => {
    const {Operations, Dentist, Date, Time,Client} = req.body
    console.log(Operations, Dentist, Date, Time,Client)
}

module.exports.Operations = async(req, res) => {
    const {Nomedaoperação, TempoOperação} = req.body
    console.log(Nomedaoperação, TempoOperação)
}

module.exports.Workers = async(req, res) => {
    const {FunçãoFuncionário, Nome, Email, Celular} = req.body
    console.log(FunçãoFuncionário, Nome, Email, Celular)
}
