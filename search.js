var google = require('googleapis');
var search = google.customsearch('v1');

const CX = "y-o_5bbtouc";
const API_KEY = "AIzaSyCRZ-B_tVNbkjb7ajFIvWfYW6avBhTnMGU";

function query(searchTerm, limit) {
    return customesearch.cse.list({cx: CX, q: searchTerm, auth: API_KEY}, (err, res) => {
        if(err) {
            return 'error has occured';
        }
        return res.searchInformation.formattedTotalResults;
    });
}

module.exports = query;
