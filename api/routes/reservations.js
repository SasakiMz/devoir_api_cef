const express = require('express');
const router = express.Router();
const reservations = require('../services/reservations');

router.get('/:id/reservations', reservations.getReservations);
router.get('/:id/reservations/:idReservation', reservations.getById);
router.post('/:id/reservations', reservations.add);
router.put('/:id/reservations/:idReservation', reservations.update);
router.delete('/:id/reservations/:idReservation', reservations.delete);

module.exports = router;