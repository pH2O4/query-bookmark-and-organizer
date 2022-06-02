const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

module.exports.Consult = async(req, res) => {
    const {Operations, Dentist, Date, Time,Client} = req.body
    console.log(Operations, Dentist, Date, Time,Client)
}
