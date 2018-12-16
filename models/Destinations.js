import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Destinations = new Schema({
    prefectures: {
        type: String
    },
    imagePath: {
        type: String
    },
    name: {
        type: String
    },
    description: {
        type: String
    },
    marks: {
        type: Number
    },
    link: {
        type: String
    },
    likeCount: {
        type: Number
    }
});

export default mongoose.model('Destinations', Destinations);
