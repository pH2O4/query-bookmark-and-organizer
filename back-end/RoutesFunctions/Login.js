const { PrismaClient } = require('@prisma/client')
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient()

const Login = async () => {
    const Email = req.body.Email
    const Pass = req.body.Pass
    const user = await prisma.user.findUnique({
      where: {
        Email: Email,
      },
    })
      if(user.Email == Email & user.Pass == Pass){
    const chavePrivada = "ti%aoxrjwKBB7ex@rDJDst@Cw@ioCqx!SR^oo"
    jwt.sign(dadosUsuario, chavePrivada, (err, token) => {
      if (err) {
          res
              .status(500)
              .json({ mensagem: "Erro ao gerar o JWT" });

          return;
      }

      res.set("x-access-token", token);
      res.end();
  });
} else {
  res.status(401);
  res.end();
}
  }

  
module.exports = Login