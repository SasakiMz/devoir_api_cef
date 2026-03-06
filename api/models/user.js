const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
const bcrypt    = require('bcrypt');

const User  = new Schema({
    name: {
        type    : String,
        trim    : true,
        required : [true, 'le nom est requis'],
    },
    email: {
        type    : String,
        true    : true,
        required: [true,'L`email est requis'],
        unique  : true,
        lowercase: true,
    },
    password: {
        type: String,
        trim: [true,'le mot de passe est requis'],
    }
},{
    timestamps: true,
});

User.pre('save', async function() {
    if (!this.isModified('password')) {
        return;
    }

    this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model('User', User);
