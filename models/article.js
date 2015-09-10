/**
 * Created by 460473 on 11/5/2014.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
    articleName: {type: String},
    techName: String,
    category: String,
    description: String,
    createdOn: Date,
    lastModified: Date
});

var article = mongoose.model('Article', articleSchema);

article.on('error', function () {
    console.log('\n\nDATABASE ERROR <Mongoose.Model> | <Item>: \n', arguments, '\n\n');
});

module.exports = article;