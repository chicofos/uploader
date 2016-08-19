
var uploader = require('../uploader/uploader');

module.exports = (express) => {

    const router = express.Router();

    router.route('/')
        .post((req,res) => {
            uploader.saveFile(req, (err, result) => {
                if(err) res.end(err);
                res.end(result);
            });
        })
        .get((req,res) => {
            uploader.readFiles((err, files) => {
                if(err) res.end(err);
                res.render('index', { images : files });
            });
        });
    router.route('/upload')
        .post((req,res) => {
            uploader.downloadImage(req.body.url, (err, result) => {
                res.end(result);
            });
        });
    
    return router;
}