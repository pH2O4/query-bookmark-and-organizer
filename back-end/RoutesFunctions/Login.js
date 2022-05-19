const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const Login = () => {
    const Email = req.body.Email
    const Pass = req.body.Pass
    const user = await prisma.user.create({
        data: {
          email: Email,
          name: Pass,
        }
      })
}

export default Login