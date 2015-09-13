/**
 * Created by 460473 on 11/5/2014.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var developerSchema = new Schema({
    projectName: {type: String},
    developerName: String,
    developerID: String,
    role: String,
    startDate: Date,
    endDate: Date,
    effortPercent: String,
    createdOn: Date,
    lastModified: Date
});

var developer = mongoose.model('Developer', developerSchema);

developer.on('error', function () {
    console.log('\n\nDATABASE ERROR <Mongoose.Model> | <Item>: \n', arguments, '\n\n');
});

module.exports = developer;