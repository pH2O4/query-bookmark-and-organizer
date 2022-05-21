const express = require("express");
const cors = require('cors');
const app = express();


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const middlewareValidarJWT = (req, res, next) => {
    const jwt = req.headers["authorization"];
    const chavePrivada = "ti%aoxrjwKBB7ex@rDJDst@Cw@ioCqx!SR^oo";

    // Efetuando a validação do JWT:
    const jwtService = require("jsonwebtoken");
    jwtService.verify(jwt, chavePrivada, (err, userInfo) => {
        if (err) {
            res.status(403).end();
            return;
        }

        req.userInfo = userInfo;
        next();
    });
};

app.post('/Login', async (req, res) =>{
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
      res.send('skaks')
      res.end();
  });
} else {
  res.status(401);
  res.send('skaks')
  res.end();
}})

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Running in http://localhost:${PORT}`);
})