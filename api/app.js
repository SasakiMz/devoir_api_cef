
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors  = require('cors');

const indexRouter = require('./routes/index');
const mongodb = require('./db/mongo.js');
const catwaysRoutes = require('./routes/catways');
const reservationsRoutes = require('./routes/reservations');
const path = require('path');



mongodb.initClientDbConnection();

const app = express();

app.use(cors({
    exposedHeaders: ['Authorization'],
    origin: '*'

}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/', indexRouter);

app.use('/catways', reservationsRoutes);
app.use('/catways', catwaysRoutes);

app.set('view engine', 'ejs');

app.use(function(req, res, next) {
    res.status(404).json({name: 'API', version: '1.0', status : 404, message: 'not_found'});
});


module.exports = app;