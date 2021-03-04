const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const biodata = new Schema({
    nama : {
        type: String,
        required: true
    },
    alamat : {
        type: String,
        required: true
    },
    umur : {
        type: String,
        required: true
    },
    image : {
        type: String,
        required: true
    },
    // author : {
    //     type: Object,
    //     required: true
    // }
}, {
    timestamps: true
}
);

module.exports= mongoose.model('biodata', biodata);