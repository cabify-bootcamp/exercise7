const chargeCredit = require("../clients/chargeCredit");

module.exports = function() {
    return chargeCredit().then( () => {
        console.log('ok')
    })
};