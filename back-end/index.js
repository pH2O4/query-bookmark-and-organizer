const express = require("express");
const cors = require('cors');
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.post('/Login', function (req, res) {
    res.send('Hello World')
})

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Running in http://localhost:${PORT}`);
})