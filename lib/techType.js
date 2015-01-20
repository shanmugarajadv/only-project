/**
 * Created by 460473 on 11/3/2014.
 */
var logger = require('../utils/logger');

exports.getTechType = function (req, res) {
    logger.log('info', "Getting Technology Type");

	var techtype = [{"id":1, "name": "General"}, {"id":2, "name": "Frameworks"}, {"id":3, "name": "Libraries"}];
    res.send(techtype);
};