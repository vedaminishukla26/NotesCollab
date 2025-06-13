const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
    const header = req.headers.authorization || ''
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;

    if (!token) return res.sendStatus(401);

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.userId = payload.uid;
        next();
    } catch (err) {
        return res.sendStatus(401);
    }
}

module.exports = auth
