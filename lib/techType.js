/**
 * Created by 460473 on 11/3/2014.
 */
var logger = require('../utils/logger');

/**
 * Function to fetch all Technology Types
 * @param req request object containing query criteria
 * @param res response object
 */
exports.getTechType = function (req, res) {
    logger.log('info', "Request received to fetch all technology types");

    var tech_type = [{"id": 1, "name": "General"}, {"id": 2, "name": "Frameworks"}, {"id": 3, "name": "Libraries"}];
    res.send(tech_type);
};