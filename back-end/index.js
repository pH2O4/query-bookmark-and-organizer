const express = require("express")
const cors = require('cors')
const app = express()
const {PrismaClient} = require('@prisma/client')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
const prisma = new PrismaClient()


const middlewareCheckJWT = async (req, res, next) => {
    const jwtFromFrontEnd = req.headers["authorization"]
    const chavePrivada = "ti%aoxrjwKBB7ex@rDJDst@Cw@ioCqx!SR^oo"
    const jwtService = require("jsonwebtoken")
    jwtService.verify(jwtFromFrontEnd, chavePrivada, (err, userInfo) => {
        if (err) {
            res.send('MissToken')
            res.status(403).end()
            return;
        }

        req.userInfo = userInfo
        next()
    });
};

app.post('/Login', async (req, res) =>{
    const Email = req.body.Email
    const Pass = req.body.Pass
    const userInfo = await prisma.user.findUnique({
      where: {
        Email: Email,
      },
    })
      if(userInfo.Email == Email & userInfo.Pass == Pass){
    const chavePrivada = "ti%aoxrjwKBB7ex@rDJDst@Cw@ioCqx!SR^oo"
    jwt.sign(userInfo, chavePrivada, (err, token) => {
      
      if (err) {
          res 
              .status(500)
              .json({ mensagem: "Erro ao gerar o JWT" })

          return;
      }
      expiresIn: 5000
      res.set("x-access-token", token)
   res.send(token)
      res.end();
  });
} else {

  res.status(401)
    res.send(false)
  res.end()
}})

app.post('/Recovery', async(req, res) => {
  const Email = req.body.Email
  const Pass = req.body.Pass
  const PassRepeat = req.body.PassRepeat
  if(Pass != PassRepeat){
    res.send("Passwords don't check")
  }else{
    const updateUser = await prisma.user.update({
      where: {
        Email: Email,
      },
      data: {
        Pass: Pass,
      },
    })
  }
  res.send('Password Changed')
}) 

app.get('/AuthStatus',middlewareCheckJWT ,  (req, res) => {
  res.json(req.userInfo)
})

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Running in http://localhost:${PORT}`)
})