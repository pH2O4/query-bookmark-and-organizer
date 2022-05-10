const express = require("express");
const Puppeteer = require('puppeteer');
const cors = require('cors');
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', function (req, res) {
    res.send('Hello World')
})

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Running in http://localhost:${PORT}`);
})