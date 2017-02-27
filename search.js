'use strict';

var google = require('googleapis');
var customsearch = google.customsearch('v1');

const CX = "005926003013440185435:y-o_5bbtouc";
const API_KEY = "AIzaSyCRZ-B_tVNbkjb7ajFIvWfYW6avBhTnMGU";

function search(searchTerm, limit) {
    return customsearch.cse.list({cx: CX, q: searchTerm, auth: API_KEY, num: limit.q}, (err, res) => {
        if(err)
            return 'error has occured';
        if (res.items && res.items.length > 0) {
            return res.items;
        }
    });
}

module.exports = search;
