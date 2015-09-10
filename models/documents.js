
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var documentSchema = new Schema({
    techName: String,
    docName: String
});

var documents = mongoose.model('Documents', documentSchema);

documents.on('error', function () {
    console.log('\n\nDATABASE ERROR <Mongoose.Model> | <Item>: \n', arguments, '\n\n');
});

module.exports = documents;
