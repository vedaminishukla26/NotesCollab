const router = require('express').Router();
const noteCtrl = require('../controllers/noteController');

router.get('/',      noteCtrl.list);
router.get('/:id',   noteCtrl.get);
router.post('/',     noteCtrl.create);
router.put('/:id',   noteCtrl.update);
router.delete('/:id',noteCtrl.remove);

module.exports = router;
