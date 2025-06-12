const express = require("express");
const cors    = require("cors");
const dotenv  = require("dotenv");
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/ping', (req, res) => {
    res.json({message: "pong at "+ new Date().toISOString() })
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`))