const uploadCtrl = {
    sendFileName: (req, res) => {
        res.status(200);
        res.send({
            status: 'Uploaded the file successfully',
            imgSrc: req.file.name
        });
    }
}

module.exports = uploadCtrl;