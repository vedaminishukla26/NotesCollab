const prisma = require('../lib/prisma');

const list = async (req, res, next) => {
    const noteId = +req.params.noteId;
    try {
        const comments = await prisma.comment.findMany({
            where: { note_id: noteId },
            orderBy: { created_at: 'asc' },
        });
        res.json(comments);
    } catch (err) { next(err); }
}

const create = async (req, res, next) => {
    const noteId = +req.params.noteId;
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Comment text required' });

    try {
        const note = await prisma.note.findUnique({ where: { id: noteId } });
        if (!note) return res.sendStatus(404);

        const comment = await prisma.comment.create({
            data: {
                text,
                note: { connect: { id: noteId } },
                author: { connect: { id: req.userId } },
            },
        });

        res.status(201).json(comment);

    } catch (err) { next(err); }
}

module.exports = {
    list,
    create
}