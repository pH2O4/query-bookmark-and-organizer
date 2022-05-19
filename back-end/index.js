const express = require("express");
const cors = require('cors');
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const Login = require('./RoutesFunctions/Login')

app.post('/Login', function (req, res) {
    Login()
})

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Running in http://localhost:${PORT}`);
})