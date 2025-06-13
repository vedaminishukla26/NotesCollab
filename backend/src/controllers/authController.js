const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const prisma = require('../lib/prisma');

const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_LIFE = '1d';

async function register(req, res, next) {
    const { email, password, username } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email & password required' });

    try {
        const hash = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({ data: { email, username, password_hash: hash } });
        const token = jwt.sign({ uid: user.id }, JWT_SECRET, { expiresIn: TOKEN_LIFE });
        res.json({ token });
    } catch (err) { next(err); }
}

async function login(req, res, next) {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password_hash))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ uid: user.id }, JWT_SECRET, { expiresIn: TOKEN_LIFE });
        res.json({ token });
    } catch (err) { next(err); }
}

module.exports = {
    register,
    login
};
