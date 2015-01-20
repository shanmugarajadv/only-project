/**
 * Created by 460473 on 11/3/2014.
 */
var Article = require('../models/article');
var logger = require('../utils/logger');

exports.addArticle = function (req, res) {
	logger.log("info", "Adding Article");
    var req_article_input = req.body;
  
	var article = new Article({
        articleName: req_article_input.articleTitle
		, techName: req_article_input.tech.techName
		, category: req_article_input.category.name
		, description: req_article_input.articlecontent
		, createdOn: new Date().toUTCString()
		, lastModified: new Date().toUTCString()
    });

    article.save(function (err) {
        if (!err) {
            logger.log('info', "Article Created");
            res.send("Article Created");
        } else {
            logger.log('error', "Error " + err);
            res.send(err);
        }
    });

};

exports.getArticles = function (req, res) {
	Article.find(function (err, article) {
        if (err) {
            res.send(err);
        }
		else {
			res.send(article);
		}

    });
};

exports.getArticle = function (req, res) {
	res.send("get article");
};

exports.getArticleCriteria = function (req, res) {
	logger.log('info', "Get Article Criteria");
	
	var name = String(req.params.id).toUpperCase();
	var category = parseInt(req.params.category);
	
		if (name == "angular") {
			name = "AngularJS";
		} else  if (name == "jq") {
			name = "jQuery";
		}
		
	var query = {"techName": name};
	
	switch (category) {
		case 1:
			query["category"] = "Best Practices";
			break;
		case 2:
			query["category"] = "Troubleshooting";		
			break;
		case 3:
			query["category"] = "Live Demo";		
			break;
	}
	
	Article.find(query, function (err, article) {
        if (err) {
            res.send(err);
        }
		else {
			res.send(article);
		}

    });
	
};

exports.updateArticle = function (req, res) {

};

exports.deleteArticle = function (req, res) {

};