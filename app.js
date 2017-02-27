'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var Promise = require('bluebird');

var imageSearch = require('./googleImageSearch');

var app = express();

app.listen(process.env.PORT || 3000);

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

module.exports = require('./db')().then(runApp);

function runApp(db){
    app.use(express.static(path.join(__dirname, './public')));
    app.use(morgan('common'));

    app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, './public/index.html'));
    });

    // api routes
    app.get('/api/latest/imagesearch/', (req, res, next) => {
        return db.lookupLatestSearchs().then(arr => arr.map((x)=> {
            return {term: x.term, when: x.when};
        })).then(arr => res.json(arr))
        .catch(next);
    });


    app.get('/api/imagesearch/:searchTerm', (req, res, next) => {
        db.insertSearchTerm(req.params.searchTerm);
        // return result of query from custom google search
        return imageSearch.search(req.params.searchTerm, req.query)
               .then(x => x.map((x)=>{
                   return {link:x.link, alt:x.title, page: x.image.contextLink};
               })).then(y => res.json(y))
               .catch(next);
    });


    app.use(function(err, req, res, next) {
        res.error = err;
        res.status(err.status || 500);
        res.json({
            message: err.message
        });
    });
}
