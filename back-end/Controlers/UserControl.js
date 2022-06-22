const {PrismaClient} = require('@prisma/client')
const bcrypt = require('bcrypt')
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')


module.exports.StatusAuth = (req, res) => {
    res.json(req.userInfo)
  }

module.exports.middlewareCheckJWT = async (req, res, next) => {
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
    })
}

module.exports.RecoveryPass = async(req, res) => {
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
  }

  module.exports.Login = async (req, res) =>{
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
      expiresIn: "24h"
      res.set("x-access-token", token)
   res.send(token)
      res.end();
  });
} else {

  res.status(401)
    res.send(false)
  res.end()
}}