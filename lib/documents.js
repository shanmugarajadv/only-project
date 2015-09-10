var Documents = require('../models/documents');
var logger = require('../utils/logger');

exports.addDocuments = function (documents,res) {
    logger.log("debug", "Request received to add an Document");
    var req_article_input = documents;
	logger.log("debug", req_article_input.docName);
logger.log("debug",req_article_input.techName);



    var documents = new Documents({
        techName: req_article_input.techName
        , docName: req_article_input.docName
       
    });

    documents.save(function (err) {
        if (!err) {
            logger.log('debug', "Document Added Successfully");
            res.send("Document Added Successfully");
        } else {
            logger.log('error', "Error " + err);
            res.send(err);
        }
    });
};
