const express = require('express');
const router = express.Router();
const userRoute = require('../routes/users');
const Reservation = require('../models/reservation');


router.use('/users', userRoute);

router.get('/', (req, res) => { 
    res.render('index');
});

router.get('/dashboard', async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.render('dashboard', {
            today: new Date(),
            reservations: reservations,
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
module.exports = router;
