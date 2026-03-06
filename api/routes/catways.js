const express = require('express');
const router = express.Router();
const catways = require('../services/catways');

router.get('/', catways.getAll);
router.get('/:id', catways.getById);
router.post('/', catways.add);
router.put('/:id', catways.update);
router.delete('/:id', catways.delete);

module.exports = router;