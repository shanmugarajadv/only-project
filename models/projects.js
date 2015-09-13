/**
 * Created by 460473 on 11/5/2014.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectsSchema = new Schema({
    projectName: String,
    projectStatus: String,
    startDate: String,
    sitDate: String,
    uatDate: String,
    prdDate: String,
    projectManager: String,
    comments: String,
    createdOn: Date,
    lastModified: Date
});

var project = mongoose.model('Projects', projectsSchema);

project.on('error', function () {
    console.log('\n\nDATABASE ERROR <Mongoose.Model> | <Item>: \n', arguments, '\n\n');
});

module.exports = project;