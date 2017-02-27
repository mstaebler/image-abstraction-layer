'use strict';

var google = require('googleapis');
var customsearch = google.customsearch('v1');
var Promise = require('bluebird');

const CX = "005926003013440185435:y-o_5bbtouc";
const API_KEY = "AIzaSyCRZ-B_tVNbkjb7ajFIvWfYW6avBhTnMGU";

exports.search = function(searchTerm, limit) {
    var result;
    Promise.resolve(customsearch.cse.list({cx: CX, q: searchTerm, auth: API_KEY, num: limit.q}, (err, res) => {
        if(err)
            return 'error has occured';
        if (res.items && res.items.length > 0)
            result = res.items;
    }));
    return result;
};
