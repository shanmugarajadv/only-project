/**
 * Created by 460473 on 11/3/2014.
 */
var logger = require('../utils/logger');

/**
 * Function to fetch all categories
 * @param req request object containing query criteria
 * @param res response object
 */
exports.getCategory = function (req, res) {
    logger.log('info', "Request received to fetch all categories");

    var category = [{"id": 1, "name": "Best Practices"}, {"id": 2, "name": "Troubleshooting"}, {
        "id": 3,
        "name": "Live Demo"
    }];
    res.send(category);
};