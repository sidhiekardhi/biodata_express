const express= require('express');
const app = express();
const biodataRoutes= require('./src/routes/biodata');
const registerRoutes= require('./src/routes/auth');
const bodyParser= require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const mysqlConnection = require('./src/database');

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype==='image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null, true)
    } else {
        cb(null, false)
    }
}
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', biodataRoutes)
app.use('/', registerRoutes)


// mongoose.connect('mongodb+srv://Sidhiek:bXBwtB6pHETZ5r6s@cluster0.imdkh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
// .then( success => {
//     app.listen(5000);
//     console.log("sukses bos")
//     }
//     )
// .catch(err => console.log("error bos"+ err))



app.listen(4000);




app.use((error, req, res, next) => {
    const status= error.errorStatus || 500;
    const message = error.message;
    const data= error.data;
    res.status(status).json({message : message, data: data})
    // app.use((error, req, res, next) => {
    //     const status = error.errorStatus || 500;
    //     const message = error.message;
    //     const data = error.data;
    //     res.status(status).json({message : message, data: data})
    // })
})