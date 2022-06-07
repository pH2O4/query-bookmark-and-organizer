const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports.Consult = async (req, res) => {
    const { Operations, Dentist, Date, Time, Client } = req.body
    console.log(Operations, Dentist, Date, Time, Client)

}

module.exports.Operations = async (req, res) => {
    try {
        const { Nomedaoperação, TempoOperação } = req.body
        const TempoOperaçãoConvert = parseInt(TempoOperação)
        const Operation = await prisma.Operation.create({
            data: {
                Name: Nomedaoperação,
                OperationTime: TempoOperaçãoConvert,
            },
        })
        res.send('Sua operação foi registrada com sucesso!')
    } catch (error) {
        res.send('A operação já existe')
    }
}

module.exports.OperationsConsult = async (req, res) => {
    try {
        const OperationsConsultData = await prisma.Operation.findMany()
        console.log(OperationsConsultData)
        res.send(OperationsConsultData)
    } catch (error) {
        res.send('A operação já existe')
    }
}

module.exports.ConsultWorkers = async (req, res) => {
   // try {
        const ConsultWorkers = await prisma.User.findMany({
            where: {
                Function: 'Dentista'
            },
          })
        res.send(ConsultWorkers.map( Dentist => Dentist.Name))
  //  } catch (error) {
    //    res.send('O dentista já existe')
 //   }
}

module.exports.Workers = async (req, res) => {
    const { FunçãoFuncionário, Nome, Email, Celular, Admin } = req.body
    const CelularConvert = parseInt(Celular)
    const User = await prisma.User.create({
        data: {
            Email: Email,
            Name: Nome,
            Cellphone: CelularConvert,
            Function: FunçãoFuncionário,
            Admin: Admin,
        },
    })
    res.send("Funcionário cadastrado com sucesso!")
}
