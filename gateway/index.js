const express = require("express")
const cors = require("cors")
const proxy = require("express-http-proxy")

const app = express()

const PORT = 8000;
const HOST = 'localhost';

app.use(cors())
app.use(express.json())

// 110.238.83.6

app.use("/customer", proxy("http://localhost:8001"))
app.use("/shopping", proxy("http://localhost:8003"))
app.use("/", proxy("http://localhost:8002"))

app.listen(PORT, HOST, ()=>{
    console.log(`Gateway on http://${HOST}:${PORT}`);
})