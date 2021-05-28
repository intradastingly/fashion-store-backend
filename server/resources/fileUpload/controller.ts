import express from "express";

exports.upload = (req: any, res: express.Response) => {
    console.log(req.files)

    if(req.files?.image) {
        const fileName = Date.now() + '-' + req.files.image.name;
        req.files.image.mv(`uploads/${fileName}`, () => {
            res.status(200).send(fileName)
        })
    } else {
        res.status(500).send()
    }
}

exports.allImages = (req: any, res: express.Response) => {
   
}