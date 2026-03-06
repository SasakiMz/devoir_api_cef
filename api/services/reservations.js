const Reservation = require('../models/reservation');


// Callback servant à récupérer toutes les réservations d'un catway
exports.getReservations = async (req, res, next) => {
    const catwayNumber = req.params.id;

    try {
        let reservations = await Reservation.find({ catwayNumber: catwayNumber });

        return res.status(200).json(reservations);
    } catch (error) {
        return res.status(501).json(error);
    }
};


// Callback servant à récupérer une réservation
exports.getById = async (req, res, next) => {
    const idReservation = req.params.idReservation;

    try {
        let reservation = await Reservation.findById(idReservation);

        if (reservation) {
            return res.status(200).json(reservation);
        }

        return res.status(404).json('reservation_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
};


// Callback servant à ajouter une réservation
exports.add = async (req, res, next) => {

    const temp = ({
        catwayNumber : req.params.id,
        clientName   : req.body.clientName,
        boatName     : req.body.boatName,
        startDate    : req.body.startDate,
        endDate      : req.body.endDate
    });

    try {
        let reservation = await Reservation.create(temp);

        return res.status(201).json(reservation);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};


// Callback servant à modifier une réservation
exports.update = async (req, res, next) => {

    const idReservation = req.params.idReservation;

    const temp = ({
        clientName : req.body.clientName,
        boatName   : req.body.boatName,
        startDate  : req.body.startDate,
        endDate    : req.body.endDate
    });

    try {
        let reservation = await Reservation.findOne({ _id: idReservation });

        if (reservation) {

            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    reservation[key] = temp[key];
                }
            });

            await reservation.save();

            return res.status(200).json(reservation);
        }

        return res.status(404).json('reservation_not_found');

    } catch (error) {
        return res.status(501).json(error);
    }
};


// Callback servant à supprimer une réservation
exports.delete = async (req, res, next) => {

    const idReservation = req.params.idReservation;

    try {
        await Reservation.deleteOne({ _id: idReservation });

        return res.status(204).json('delete_ok');

    } catch (error) {
        return res.status(501).json(error);
    }
};