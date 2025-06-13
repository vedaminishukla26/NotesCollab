const router = require('express').Router({ mergeParams: true });
const cCtrl = require('../controllers/commentController');

router.get('/:noteId/comments',  cCtrl.list);
router.post('/:noteId/comments', cCtrl.create);

module.exports = router;
