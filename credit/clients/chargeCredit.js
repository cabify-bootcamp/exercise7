const updateCreditTransaction = require("../transactions/updateCredit");

module.exports = function() {
    return updateCreditTransaction(
        {
          amount: { $gte: 1 }
        },
        {
          $inc: { amount: -1 }
        },
        function(doc, error) {
          if (error) {
            return cb(undefined, error);
          } else if (doc == undefined) {
            let error = "Not enough credit";
            console.log(error, 'error');
            cb(undefined, error);
          } else {
            return 'ok'
          }
    })
};