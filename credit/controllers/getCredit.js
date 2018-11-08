const getCredit = require("../clients/getCredit");

module.exports = function() {
    getCredit().then(credit => {
        res.json(credit);
      });
};