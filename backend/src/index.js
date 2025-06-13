const express = require("express");
const cors    = require("cors");
const dotenv  = require("dotenv");
dotenv.config()

const authRoutes   = require('./routes/auth');
const noteRoutes   = require('./routes/notes');
const commentRoutes= require('./routes/comments');

const auth = require('./middleware/auth')
app.use(require('./middleware/errorHandler'));

const app = express()
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json())

app.use('/api/auth', authRoutes);
app.use('/api/notes', auth, noteRoutes);
app.use('/api/notes', auth, commentRoutes);  

app.get('/api/ping', (req, res) => {
    res.json({message: "pong at "+ new Date().toISOString() })
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`))