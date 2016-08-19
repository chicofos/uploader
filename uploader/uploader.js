const fs = require('fs');
const request = require('request');

exports.saveFile = (req, callback) => {
    
    req.pipe(req.busboy);

    req.busboy.on('file', (fieldname, file, filename) => {

        var fstream = fs.createWriteStream('./uploads/' + filename);
        
        file.pipe(fstream);

        fstream.on('close', () => {
           callback(null, 'done');
        });

        fstream.on('error', (err) => {
            callback(err);
        });
    });
};

exports.readFiles = (callback) => {
    fs.readdir('./uploads', (err, files) => {
        if(err) callback(err);
        callback(null, files);
    });
};

exports.downloadImage = (url, callback) => {
    
    var filename = url.split('/').pop();

    request.head(url, (err, res, body) => {
        var stream = fs.createWriteStream('./uploads/%s', filename);

        request(url).pipe(stream);

        stream.on('close',() => {
            callback('done');
        });

        stream.on('error', (err) => {
            callback(err);
        });
    });
};