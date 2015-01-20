var express = require('express');
var router = express.Router();
var article = require('../lib/article.js');
var tech = require('../lib/tech.js');
var category = require('../lib/category.js');
var techType = require('../lib/techType.js');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {title: 'Sample Application'});
});

router.post('/tech', tech.addTech);
router.get('/tech', tech.getTechs);
router.get('/tech/:id', tech.getTech);
router.put('/tech', tech.updateTech);
router.delete('/tech/:id', tech.deleteTech);

router.get('/category', category.getCategory);
router.get('/techType', techType.getTechType);

router.post('/article', article.addArticle);
router.get('/article', article.getArticles);
router.get('/article/:id', article.getArticle);
router.get('/article/:id/:category', article.getArticleCriteria);
router.put('/article', article.updateArticle);
router.delete('/article/:id', article.deleteArticle);

module.exports = router;