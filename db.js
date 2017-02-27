'use strict';

require('dotenv').config();

var Promise = require('bluebird');
var MongoClient = require('mongodb').MongoClient;
var db;

Promise.promisifyAll(MongoClient);

module.exports = function() {
  return MongoClient.connectAsync(process.env.MONGO_CONNECTION_STRING)
  .then(connection => {
    db = connection.collection('searchTermList');
    return {
      insertSearchTerm,
      lookupLatestSearchs
    };
  });
};

function insertSearchTerm(searchTerm){
  return Promise.resolve(db.insertOne({term: searchTerm, when: new Date()}));
}

function lookupLatestSearchs() {
  return Promise.resolve(db.find().toArray());
}
