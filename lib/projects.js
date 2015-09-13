/**
 * Created by 460473 on 11/3/2014.
 */
var Projects  = require('../models/projects');
var logger = require('../utils/logger');

/**
 * Function to Add an Article
 * @param req request object containing user inputs
 * @param res response object
 */
exports.addProjects = function (req, res) {
    logger.log("debug", "Request received to add an Project");
    var req_project_input = req.body;

    console.log(req_project_input);
    var project = new Projects ({
        projectName: req_project_input.projectName,
        projectStatus: req_project_input.selectedStatus.name,
        startDate: req_project_input.startDate,
        sitDate: req_project_input.sitDate,
        uatDate: req_project_input.uatDate,
        prdDate: req_project_input.prdDate,
        projectManager: req_project_input.projectManager,
        comments: req_project_input.comments,
        createdOn: new Date().toUTCString(),
        lastModified: new Date().toUTCString()
    });

    project.save(function (err) {
        if (!err) {
            logger.log('debug', "Project Added Successfully");
            res.send("Project Added Successfully");
        } else {
            logger.log('error', "Error " + err);
            res.send(err);
        }
    });
};

exports.getProjects = function (req, res) {
    logger.log("debug", "Request received to fetch all Projects");
    Projects.find(function (err, project) {
        if (err) {
            logger.log('error', "Error " + err);
            res.send(err);
        }
        else {
            logger.log('debug', "Projects information fetched successfully");
            res.send(project);
        }

    });
};

/**
 * Function to get a particular Article
 * @param req request object containing unique identifier of an article
 * @param res response object
 */
exports.getProject = function (req, res) {

    var name = req.params.id;
    logger.log('debug', "Request received to fetch an project with name : " + name);

    var article_arr = [];
    Projects.findOne({"projectName": name}, function (err, project) {
        if (err) {
            logger.log('error', "Error " + err);
            res.send(err);
        }
        logger.log('debug', "Project information fetched successfully");
        project_arr.push(project);
        res.send(project_arr);
    });
};

/**
 * Function to get a particular Article with given criteria for pagination
 * @param req request object containing query criteria for pagination
 * @param res response object
 */
exports.getProjectsPageCriteria = function (req, res) {
    var response = [];
    logger.log('debug', "Request received to fetch Projects with criteria for pagination");

    var page = req.params.id;
    var entries = req.params.category;

    var skip = (page - 1) * entries;

    logger.log('debug', "Page Number : " + page + ", Number of Entries : " + entries);
    var response = [];
    Projects.count(function (err, count) {
        if (err) {
            logger.log('error', "Error " + err);
            res.send(err);
        }
        else {
            response.push({"count": count});
            Projects.find().sort({"lastModified": -1}).skip(skip).limit(entries).exec(function (err, project) {
                if (err) {
                    res.send(err);
                }
                else {
                    response.push({"projects": project});
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
exports.deleteProject = function (req, res) {

    var name = req.params.id;

    logger.log('debug', "Request received to project article with name : " + name);

    Projects.findOne({"projectName": name}, function (err, project) {
        if (err) {
            logger.log('error', "Query 1: Error " + err);
            res.send(err);
        }

        project.remove(function (err) {
            if (!err) {
                res.send("Project removed successfully");
            } else {
                logger.log('error', "Query 2: Error " + err);
                res.send(err);
            }
        });

    });
};
