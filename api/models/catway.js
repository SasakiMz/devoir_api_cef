const mongoose = require('mongoose');

const catwaySchema = new mongoose.Schema({
    catwayNumber: { type: Number, required: true, unique: true },
    catwayType:     { type: String, enum: ["long", "short"], unique: true },
    catwayState:    { type: String, required: true },
});

module.exports = mongoose.model('Catway', catwaySchema);