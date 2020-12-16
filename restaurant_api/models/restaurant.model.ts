import * as mongoose from 'mongoose';

const RestaturantSchema: mongoose.Schema = new mongoose.Schema({
    "name": {
        "type": "String"
    },
    "address1": {
        "type": "String"
    },
    "city": {
        "type": "String"
    },
    "state": {
        "type": "String"
    },
    "zip": {
        "type": "Date"
    },
    "lat": {
        "type": "String"
    },
    "long": {
        "type": "String"
    },
    "telephone": {
        "type": "String"
    },
    "tags": {
        "type": "String"
    },
    "website": {
        "type": "String"
    },
    "genre": {
        "type": "String"
    },
    "hours": {
        "type": "String"
    },
    "attire": {
        "type": "String"
    }
});

export default mongoose.model('Restaurant', RestaturantSchema);