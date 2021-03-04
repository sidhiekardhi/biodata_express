const {validationResult} = require('express-validator');
const Biodata = require('../model/biodata')
const fs = require('fs')
const path= require('path');

// if(!errors.isEmpty){
//     const err = new Error('input value tidak sesuai');
//     err.errorStatus = 400;
//     err.data= errors.array();
//     throw err;
// }

// if (!req.file) {
//     const err = new Error('image harus di isi')
//     err.errorStatus= 422;
//     throw err;
// }
exports.createBiodata = (req, res, next) => {
    const errors = validationResult(req);


    const nama = req.body.nama;
    const alamat= req.body.alamat;
    const umur= req.body.umur;
    const image= req.file.path;

    const Posting = new Biodata({
        nama: nama,
        alamat: alamat,
        umur: umur,
        image: image
    })

    Posting.save().then(result => {
        res.status(201).json({
            message: "create biodata success",
            data: result
        })
        next();
    }).catch(err => console.log(err))    
}

exports.getBiodata = (req, res, next) => {
    const currentPage= req.query.page || 1;
    const perPage = req.query.perPage || 5;
    let totalItems;

    Biodata.find()
    .countDocuments()
    .then(count => {
        totalItems = count;
        return Biodata.find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then(result => {
        res.status(200).json({
            message: "Data Biodata Berhasil Di ambil",
            data: result,
            totalData: totalItems,
            perPage: perPage,
            currentPage : currentPage
        })
    }).catch(err => {
        next(err);
    })

    // Biodata.find().then(result => {
    //     res.status(200).json({
    //         message: "Data Biodata Berhasil Di ambil",
    //         data: result
    //     })
    // }).catch(err => {
    //     next(err);
    // })
}
exports.getBiodataById = (req, res, next) => {
   const bioId= req.params.bioId;
    Biodata.findById(bioId).then(result => {
        if (result) {
            res.status(200).json({
                message: "Data Biodata By Id Berhasil Di ambil",
                data: result
            })    
        } else {
            const err = new Error('input value tidak sesuai');
            err.errorStatus = 400;
            err.data= errors.array();
            throw err;
        }

    }).catch(err => {
        next(err);
    })
}

exports.updateBiodata = async (req, res, next) => {

    // let nama = req.params.nama;
    // console.log(nama);
    // await Biodata.findOneAndUpdate({nama: nama}, req.body, (err, docs)=>{
    //     if (err || docs === null) {
    //         res.status(400).json({
    //             message : "gagal update data",
    //         })
    //     } else {
    //         res.status(201).json({
    //             message: "sukses update data",
    //             data: docs
    //         })
    //     }
    // });

    // let nama = req.params.nama;
    //   biodataParams = {
    //      image = req.file.path,
    //     alamat: req.body.alamat,
    //     umur: req.body.umur,
    //   };

    // Biodata.findOneAndUpdate({
    //     nama: nama
    // }, biodataParams)
    //   .then(result => {
    //     res.status(201).json({
    //     message: "sukses update data",
    //     data: result
    // })
    //   })
    //   .catch(error => {
    //     console.log(`Error updating course by ID: ${error.message}`);
    //     next(error);
    //   });
  

    const errors = validationResult(req);
    if(!errors.isEmpty){
        const err = new Error('input value tidak sesuai');
        err.errorStatus = 400;
        err.data= errors.array();
        throw err;
    }

    if (!req.file) {
        const err = new Error('image harus di isi')
        err.errorStatus= 422;
        throw err;
    }

    const nama = req.body.nama;
    const image = req.file.path;
    const alamat = req.body.alamat;
    const umur = req.body.umur;
    const bioId= req.params.id;
    
    Biodata.findById(bioId)
    .then(post => {
        if(!post) {
            const error = new Error('id tidak di temukan');
            error.errorStatus=404;
            throw error;
        } 

        post.nama= nama;
        post.alamat = alamat;
        removeImage(post.image);
        post.image= image;
        post.umur = umur;
        return post.save();
    })
    .then(result => {
        console.log(result);
    res.status(200).json({
        message: "Update telah berhasil",
        data : result,
    })
    })
    .catch(err => {
        next(err)
    })
    
}

exports.deleteBiodata= (req, res, next) => {
    const bioId = req.params.bioId;

    Biodata.findById(bioId)
    .then(post => {
        if(!post){
            const error = new Error('id tidak di temukan');
            error.errorStatus=404;
            throw error;
        }
        removeImage(post.image);
        return  Biodata.findByIdAndRemove(bioId)

    }).
    then(result => {
        res.status(200).json({
            message : "Hapus blog post berhasil",
            data : result
        })
    })
    .catch(err => {
        next(err);
    })
    
}

const removeImage= (filepath) => {
console.log('filepath : ' + filepath);
console.log('direktory name : '+ __dirname)

filepath = path.join(__dirname, '../../', filepath);
fs.unlink(filepath, err => {
    console.log(err)
})
}
