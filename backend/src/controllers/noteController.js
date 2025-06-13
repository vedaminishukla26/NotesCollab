const prisma = require('../lib/prisma');

const list = async (req, res, next) => {
    try {
        const notes = await prisma.note.findMany({
            where: { createdBy: {id: req.userId} },
            orderBy: { updatedAt: 'desc' },
        });
        res.json(notes);
    } catch (err) { next(err); }
}

const get = async (req, res, next) => {
    const id = +req.params.id;
    try {
        const note = await prisma.note.findFirst({
            where: { id, createdBy: req.userId },
            include: { comments: true },
        });
        if (!note) return res.sendStatus(404);
        res.json(note);
    } catch (err) { next(err); }
}

const create = async (req, res, next) => {
    const { title, content, userId } = req.body;
    console.log("RQ: ", req.body)
    if (!title) return res.status(400).json({ error: 'Title required' });

    try {
        const note = await prisma.note.create({
            data: { title, content, createdBy: { connect: {id: userId}} },
        });
        res.status(201).json(note);
    } catch (err) { next(err); }
}

const update = async (req, res, next) => {
    const id = +req.params.id;
    const { title, content } = req.body;
    try {
        const note = await prisma.note.updateMany({
            where: { id, createdBy: {connect: {id: req.userId}} },
            data: { title, content },
        });
        if (!note.count) return res.sendStatus(404);
        res.json({ ok: true });
    } catch (err) { next(err); }
}

const remove = async (req, res, next) => {
    const id = +req.params.id;
    try {
        const deleted = await prisma.note.deleteMany({
            where: { id, createdBy: {connect: {id: req.userId}} },
        });
        if (!deleted.count) return res.sendStatus(404);
        res.sendStatus(204);
    } catch (err) { next(err); }
}

module.exports = {
    list, 
    get,
    create,
    update,
    remove
}