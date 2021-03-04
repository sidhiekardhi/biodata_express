exports.createRegister = (req, res, next) => {
    const nama = req.body.nama;
    const alamat= req.body.alamat;
    const umur= req.body.umur;
    const email= req.body.email;    

    const result = {
        message: "create Register success",
        data: [
            {
                id: 1,
                nama : nama,
                alamat: alamat,
                umur: umur,
                email: email
            }

        ]
    }
    res.status(201).json(result)
    next();
}

// exports.getBiodata = (req, res, next) => {
//     res.json({
//         message: "data berhasil di ambil",
//         data : [
//             {
//                 id: 1,
//                 nama: "Sidhiek ardhiansah",
//                 alamat: "bekasi",
//                 umur : 25
//             }
//         ]
//     })
//     next();
// }
