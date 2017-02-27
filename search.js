'use strict';

var google = require('googleapis');
var customsearch = google.customsearch('v1');
var Promise = require('bluebird');

const CX = "005926003013440185435:y-o_5bbtouc";
const API_KEY = "AIzaSyCRZ-B_tVNbkjb7ajFIvWfYW6avBhTnMGU";

Promise.promisifyAll(customsearch.cse);

// I want to return res.items. I am returning { isFulfilled: false, isRejected: false} error 304 is shown.
module.exports.search = function(searchTerm, limit) {
    return customsearch.cse.listAsync({cx: CX, q: searchTerm, auth: API_KEY, num: limit.q})
           .then(res => res.items);
};

// customsearch.cse.list({cx: CX, q: searchTerm, auth: API_KEY, num: limit.q}, (err, res) => {
//     if(err)
//         return 'error has occured';
//     if (res.items && res.items.length > 0)
//         return res.items;
// });
