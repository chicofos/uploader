
var uploader = require('../uploader/uploader');

module.exports = function(express){

    var router = express.Router();

    router.route('/')
        .post(function(req,res){
            uploader.saveFile(req, function(err, result){
                if(err)
                    res.end(err);

                res.end(result);
            });
        })
        .get(function(req,res){
            uploader.readFiles(function(err, files){
                if(err)
                res.end(err);

                res.render('index', { images : files });
            });
        });
    

    return router;
}