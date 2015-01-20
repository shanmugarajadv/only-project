/**
 * Created by 460473 on 11/3/2014.
 */
var Tech = require('../models/tech');
var logger = require('../utils/logger');

exports.addTech = function (req, res) {

    var req_tech_input = req.body;
	
    var tech = new Tech({
        techName: req_tech_input.techName 
        , class: req_tech_input.class
		, type: req_tech_input.techType.name
		, createdOn: new Date().toUTCString()
		, lastModified: new Date().toUTCString()
    });

    tech.save(function (err) {
        if (!err) {
            logger.log('info', "Tech Created");
            res.send("Tech Created");
        } else {
            logger.log('error', "Error " + err);
            res.send(err);
        }
    });
};

exports.getTechs = function (req, res) {
    logger.log('info', "Getting Techs");
    Tech.find( function (err, tech) {
        if (err) {
            res.send(err);
        }
		
        res.send(tech);
    });
};

exports.getTech = function (req, res) {

};

exports.updateTech = function (req, res) {

};

exports.deleteTech = function (req, res) {
       logger.log('info', "deleting Techs");
	   
	Tech.findOne({"techName": req.params.id}, function (err, tech) {
        if (err) {
            res.send(err);
        }

        tech.remove(function (err) {
            if (!err) {
                res.send("Technology removed");
            } else {
                res.send(err);
            }
        });

    });
};
