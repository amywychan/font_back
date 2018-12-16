import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Destinations from './models/Destinations';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://amy:amy920124@ds123171.mlab.com:23171/jp');

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB connected');
});

router.route('/').get((req, res) => {
    Destinations.find((err, destinations) => {
        if (err)
            res.json(err);
        else
            res.json(destinations);
    });
});

router.route('/destinations').get((req, res) => {
    Destinations.find((err, destinations) => {
        if (err)
            res.json(err);
        else
            res.json(destinations);
    });
});

router.route('/destinations/:prefectures').get((req, res) => {
    Destinations.find({prefectures:req.params.prefectures},(err, destinations) => {
        if (err)
            res.json(err);
        else
            res.json(destinations);
    });
});

router.route('/destinations/:id').get((req, res) => {
    Destinations.findById(req.params.id, (err, destinations) => {
        if (err)
            res.json(err);
        else
            res.json(destinations);
    });
});

router.route('/destinations/like/:id').get((req, res) => {
    Destinations.findById(req.params.id, (err, destinations) =>{
        if (!destinations) 
            res.json(err);
        else {
            destinations.likeCount+=1;
            destinations.save().then(destinations=>{
                res.status(200).json(destinations.likeCount);
                res.json(destinations.id);
            }).catch(err => {
                res.status(400).send('Like failed');
            });
        }
    });
});

app.use('/', router);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log("App is running on port " + port);
});