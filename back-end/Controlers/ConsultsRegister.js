const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports.SeeAllUsers = async (req, res) =>{
const AllUsers = await prisma.User.findMany()
res.send(AllUsers)
}

module.exports.SeeConsultById = async(req, res) => {
    try {
          const { idConsult} = req.body
    const ConsultByID =  await prisma.Consult.findUnique({
        where: {
          id: idConsult,
        },
      })
    res.send(ConsultByID)
    } catch (error) {
        console.log(error)
    }
  
}

module.exports.Consult = async (req, res) => {
    const { Operations, Dentist, Date, Time, Client } = req.body
    console.log(Operations, Dentist, Date, Time, Client)
     const Consult = await prisma.Consult.create({
        data: {
            Operation: Operations,
            Day: Date,
            Time: Time,
            Client: Client,
            Dentist: Dentist
        }
    })
    res.send('Consulta marcada com sucesso!')
}

module.exports.SeeContultForDay = async (req, res) => {
const {Day} = req.body
const slitDay = Day.split('T')
const dayTrated = slitDay[0]
const Consult = await prisma.Consult.findMany({
    where: {
        Day: dayTrated
    },
  })
  if(Consult.length > 0){
    res.send(Consult)
  }else{
    res.send("Nenhuma Consulta Econtrada nesse dia")
  }
}

module.exports.SeeAllConsults = async (req, res) => {
    const ConsultAllConults = await prisma.Consult.findMany({
        orderBy:[
            {
                Time : 'asc',
            },
          ]
    })
    res.send(ConsultAllConults)
}

module.exports.Operations = async (req, res) => {
    const { Nomedaoperação, TempoOperação } = req.body
    const TempoOperaçãoConvert = parseInt(TempoOperação)
    const ChekingOperationExist = await prisma.Operation.findUnique({
        where: {
            Name: Nomedaoperação,
        },
    })
    if (ChekingOperationExist) {
        res.send('Operação já existe')
    } else {
        try {

            const Operation = await prisma.Operation.create({
                data: {
                    Name: Nomedaoperação,
                    OperationTime: TempoOperaçãoConvert,
                },
            })
            res.send('Sua operação foi registrada com sucesso!')
        } catch (error) {
            res.send('Verifique a ortografia dos campos')
        }
    }

}

module.exports.OperationsConsult = async (req, res) => {
    try {
        const OperationsConsultData = await prisma.Operation.findMany()

        res.send(OperationsConsultData)
    } catch (error) {
    }
}

module.exports.ConsultWorkers = async (req, res) => {
    try {
        const ConsultWorkers = await prisma.User.findMany({
            where: {
                Function: 'Dentista'
            },
        })
        res.send(ConsultWorkers.map(Dentist => Dentist.Name))
    } catch (error) {

    }
}

module.exports.Workers = async (req, res) => {
    const { FunçãoFuncionário, Nome, Email, Celular, Admin } = req.body
    const CheckingEmailExist = await prisma.User.findUnique({
        where: {
            Email: Email,
        },
    })
    console.log(typeof CheckingEmailExist)
    if (CheckingEmailExist) {
        res.send('Email já cadastrado')
    } else {
        try {
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
        } catch (error) {
            res.send('Houve um erro de digitação por favor verifique a ortografia dos campos')
        }
    }
}

