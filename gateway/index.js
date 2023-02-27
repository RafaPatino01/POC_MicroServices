const express = require("express")
const cors = require("cors")
const proxy = require("express-http-proxy")

const app = express()

const PORT = 8000;
const HOST = 'localhost';

app.use(cors())
app.use(express.json())

// 110.238.83.6

app.use("/customer", proxy("http://110.238.83.6:30001"))
app.use("/shopping", proxy("http://110.238.83.6:30003"))
app.use("/", proxy("http://110.238.83.6:30002"))

app.listen(PORT, HOST, ()=>{
    console.log(`Gateway on http://${HOST}:${PORT}`);
})