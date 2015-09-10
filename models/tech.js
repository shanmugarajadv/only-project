/**
 * Created by 460473 on 11/5/2014.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var techSchema = new Schema({
    techName: {type: String, unique: true},
    class: String,
    type: String,
    createdOn: Date,
    lastModified: Date
});

var tech = mongoose.model('Tech', techSchema);

tech.on('error', function () {
    console.log('\n\nDATABASE ERROR <Mongoose.Model> | <Item>: \n', arguments, '\n\n');
});

module.exports = tech;