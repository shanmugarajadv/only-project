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
exports.addArticle = function (req, res) {
    logger.log("debug", "Request received to add an Article");
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
            logger.log('debug', "Article Added Successfully");
            res.send("Article Added Successfully");
        } else {
            logger.log('error', "Error " + err);
            res.send(err);
        }
    });
};

/**
 * Controller to fetch all Articles
 * @param req request object
 * @param res response object
 */
exports.getArticles = function (req, res) {
    logger.log("debug", "Request received to fetch all Articles");
    Article.find(function (err, article) {
        if (err) {
            logger.log('error', "Error " + err);
            res.send(err);
        }
        else {
            logger.log('debug', "Article information fetched successfully");
            res.send(article);
        }

    });
};

/**
 * Function to get a particular Article
 * @param req request object containing unique identifier of an article
 * @param res response object
 */
exports.getArticle = function (req, res) {

    var name = req.params.id;
    logger.log('debug', "Request received to fetch an article with name : " + name);

    var article_arr = [];
    Article.findOne({"articleName": name}, function (err, article) {
        if (err) {
            logger.log('error', "Error " + err);
            res.send(err);
        }
        logger.log('debug', "Article information fetched successfully");
        article_arr.push(article);
        res.send(article_arr);
    });
};

/**
 * Function to get a particular Article with given criteria
 * @param req request object containing query criteria
 * @param res response object
 */
exports.getArticleCriteria = function (req, res) {
    logger.log('debug', "Request received to fetch articles with criteria");

    var name = String(req.params.id);
    var category = parseInt(req.params.category);

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

    logger.log('debug', "Query criteria : " + JSON.stringify(query));
    Article.find(query, function (err, article) {
        if (err) {
            logger.log('error', "Error " + err);
            res.send(err);
        }
        else {
            logger.log('debug', "Article information fetched successfully");
            res.send(article);
        }

    });

};

/**
 * Function to get a particular Article with given criteria for pagination
 * @param req request object containing query criteria for pagination
 * @param res response object
 */
exports.getArticlePageCriteria = function (req, res) {
    var response = [];
    logger.log('debug', "Request received to fetch articles with criteria for pagination");

    var page = req.params.id;
    var entries = req.params.category;

    var skip = (page - 1) * entries;

    logger.log('debug', "Page Number : " + page + ", Number of Entries : " + entries);
    var response = [];
    Article.count(function (err, count) {
        if (err) {
            logger.log('error', "Error " + err);
            res.send(err);
        }
        else {
            response.push({"count": count});
            Article.find().sort({"lastModified": -1}).skip(skip).limit(entries).exec(function (err, article) {
                if (err) {
                    res.send(err);
                }
                else {
                    response.push({"articles": article});
                    logger.log('debug', "Article information fetched successfully");
                    res.send(response);
                }

            });
        }
    });
};

/**
 * Function to get a particular Article with given criteria for content page
 * @param req request object containing query criteria for content page
 * @param res response object
 */
exports.getArticleContentCriteria = function (req, res) {
    var response = [];
    logger.log('debug', "Request received to fetch articles with criteria for content page");

    var name = String(req.params.id);
    var category = parseInt(req.params.category);
    var page = req.params.list;

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

    var entries = req.params.entries;
    var skip = (page - 1) * entries;

    logger.log('debug', "Query criteria : " + JSON.stringify(query));
    logger.log('debug', "Page Number : " + page + ", Number of Entries : " + entries);

    var response = [];
    Article.count(query, function (err, count) {
        if (err) {
            logger.log('error', "Query 1: Error " + err);
            res.send(err);
        }
        else {
            Article.find(query).sort({"lastModified": -1}).skip(skip).limit(entries).exec(function (err, article) {
                if (err) {
                    logger.log('error', "Query 2: Error " + err);
                    res.send(err);
                }
                else {
                    response.push({"count": count});
                    response.push({"articles": article});
                    logger.log('debug', "Article information fetched successfully");
                    res.send(response);
                }
            });
        }
    });
};

/**
 * Function to update a particular Article
 * @param req request object containing query criteria
 * @param res response object
 */
exports.updateArticle = function (req, res) {

    var req_article_input = req.body;

    logger.log('debug', "Request received to update information for article with name : " + req_article_input.articleTitle);
    Article.findOne({"articleName": req_article_input.articleTitle}, function (err, article) {
        if (err) {
            res.send(err);
        }

        article.techName = req_article_input.tech;
        article.category = req_article_input.category;
        article.description = req_article_input.articlecontent;
        article.lastModified = new Date().toUTCString();

        logger.log('error', JSON.stringify(article));
        article.save(function (err) {
            if (!err) {
                logger.log('debug', "Article Updated Successfully");
                res.send("Article Updated");
            } else {
                logger.log('error', "Error " + err);
                res.send(err);
            }
        });

    });
};

/**
 * Function to delete a particular Article
 * @param req request object containing query criteria
 * @param res response object
 */
exports.deleteArticle = function (req, res) {

    var name = req.params.id;

    logger.log('debug', "Request received to delete article with name : " + name);

    Article.findOne({"articleName": name}, function (err, article) {
        if (err) {
            logger.log('error', "Query 1: Error " + err);
            res.send(err);
        }

        article.remove(function (err) {
            if (!err) {
                res.send("Article removed successfully");
            } else {
                logger.log('error', "Query 2: Error " + err);
                res.send(err);
            }
        });

    });
};
