var fs = require('fs');

exports.saveFile = function(req, callback){

    req.pipe(req.busboy);

    req.busboy.on('file', function(fieldname, file, filename){

        var fstream = fs.createWriteStream('./uploads/' + filename);
        file.pipe(fstream);

        fstream.on('close', function(){
           callback(null, 'done');
        });

        fstream.on('error', function(err){
            callback(err);
        });
    });
}

exports.readFiles = function(callback){
    fs.readdir('./uploads', function(err, files){
        if(err)
            callback(err);
        
        callback(null, files);
    });
}