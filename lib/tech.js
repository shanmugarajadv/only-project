/**
 * Created by 460473 on 11/3/2014.
 */
var Tech = require('../models/tech');
var logger = require('../utils/logger');

/**
 * Function to Add a Technology
 * @param req request object containing user inputs
 * @param res response object
 */
exports.addTech = function (req, res) {
    logger.log("debug", "Request received to add an Article");
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
            logger.log('debug', "Technology Created Successfully");
            res.send("Technology Created Successfully");
        } else {
            logger.log('error', "Error " + err);
            res.send(err);
        }
    });
};

/**
 * Controller to fetch all Technologies
 * @param req request object
 * @param res response object
 */
exports.getTechs = function (req, res) {
    logger.log("debug", "Request received to fetch all Technologies");
    Tech.find(function (err, tech) {
        if (err) {
            logger.log('error', "Error " + err);
            res.send(err);
        }
        res.send(tech);
    });
};

/**
 * Function to get a particular Technology
 * @param req request object containing unique identifier of an Technology
 * @param res response object
 */
exports.getTech = function (req, res) {

};

/**
 * Function to update a particular Technology
 * @param req request object containing query criteria
 * @param res response object
 */
exports.updateTech = function (req, res) {

};

/**
 * Function to delete a particular Technology
 * @param req request object containing query criteria
 * @param res response object
 */
exports.deleteTech = function (req, res) {
    var name = req.params.id;

    logger.log('debug', "Request received to delete article with name : " + name);

    Tech.findOne({"techName": name}, function (err, tech) {
        if (err) {
            logger.log('error', "Query 1: Error " + err);
            res.send(err);
        }

        tech.remove(function (err) {
            if (!err) {
                res.send("Technology removed successfully");
            } else {
                logger.log('error', "Query 2: Error " + err);
                res.send(err);
            }
        });
    });
};
