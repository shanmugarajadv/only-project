/**
 * Created by 460473 on 11/3/2014.
 */
var Developer = require('../models/developer');
var logger = require('../utils/logger');

/**
 * Function to Add an Article
 * @param req request object containing user inputs
 * @param res response object
 */
exports.addDeveloperDetails = function (req, res) {
    logger.log("debug", "Request received to add an Developer");
    var req = req.body;

    var projectName = req.projectName;
    var developerName = req.developersList.developerName;
    var developerID = req.developersList.developerID;
    var rolesArr = req.developersList.roles;

    rolesArr.forEach(function logArrayElements(element, index, array) {

        var developer = new Developer({
            projectName: projectName,
            developerName: developerName,
            developerID: developerID,
            role: element.role,
            startDate: element.startDate,
            endDate: element.endDate,
            effortPercent: element.effortPercent,
            createdOn: new Date().toUTCString(),
            lastModified: new Date().toUTCString()
        });

        Developer.findOne({
            "projectName": projectName,
            "developerName": developerName,
            "role": element.role
        }, function (err, dev) {

            if (!dev) {
                developer.save(function (error_1) {
                    if (!error_1) {
                        logger.log('debug', "Developer Added Successfully");
                        success = true;
                    } else {
                        logger.log('error', "Error " + error_1);
                        success = false;
                    }
                });
            } else {

                dev.startDate = element.startDate;
                dev.endDate = element.endDate;
                dev.effortPercent = element.effortPercent;
                dev.createdOn = new Date().toUTCString();
                dev.lastModified = new Date().toUTCString();

                dev.save(function (error_2) {
                    if (!error_2) {
                        logger.log('debug', "Developer Added Successfully");
                        success = true;
                    } else {
                        logger.log('error', "Error " + error_2);
                        success = false;
                    }
                });
            }
        });


    });
};

/**
 * Function to get a particular Article with given criteria for pagination
 * @param req request object containing query criteria for pagination
 * @param res response object
 */
exports.getDeveloperCriteria = function (req, res) {
    var response = [];
    logger.log('debug', "Request received to fetch developers with criteria");

    var projectName = req.params.projectName;

    Developer.find({"projectName": projectName}, {}, {sort: {"createdOn": -1}}, function (err, response) {

        var lookup = {};
        var result = [];

        for (item in response) {
            console.log(item);
            var name = response[item].developerName;

            if (!(name in lookup)) {
                lookup[name] = 1;
                result.push(response[item]);
            }
        }

        if (err) {
            res.send(err);
        }
        else {
            logger.log('debug', "Developer information fetched successfully");
            res.send(result);
        }

    });
};
