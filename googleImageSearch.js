'use strict';

var google = require('googleapis');
var customsearch = google.customsearch('v1');
var Promise = require('bluebird');

const CX = "005926003013440185435:y-o_5bbtouc";
const API_KEY = "AIzaSyCRZ-B_tVNbkjb7ajFIvWfYW6avBhTnMGU";

Promise.promisifyAll(customsearch.cse);

module.exports.search = function(searchTerm, limit) {
    return customsearch.cse.listAsync({cx: CX, q: searchTerm, auth: API_KEY, num: limit.offset || 10, searchType: "image"})
           .then(res => res.items);
};
