require('dotenv').config();

var Promise = require('bluebird'),
    MongoClient = require('mongodb').MongoClient,
    //ObjectId = require('mongodb').ObjectId,
    db;

Promise.promisifyAll(MongoClient);

module.exports = function() {
  return MongoClient.connectAsync(process.env.MONGO_CONNECTION_STRING)
  .then(connection => {
    db = connection.collection('searchTerms');
    return {
      insertSearchTerm,
      lookupLatestSearchs
    };
  });
};

function insertSearchTerm(searchTerm){
  return Promise.resolve(db.insertOne({search: searchTerm}));
}

function lookupLatestSearchs() {
  return Promise.resolve(db.find().toArray());
}
