
const updateCredit = require("./updateCredit");


var Queue = require('bull');
const updateCreditQueue = new Queue('creditQueue');


// const queueCredit = function(req, res, next) {

//     let messageObj = req.body;
//     return updateCreditQueue.add(messageObj).then( () => res.status(200).send('Added to queue'))

// }

updateCreditQueue.process(async (job, done) => {
    await updateCredit({...job.data})
    done()
})

updateCreditQueue.on('completed', (job, result) => {
    console.log(`Job completed with result ${result}`);
  })

updateCreditQueue.on('active', function (job, jobPromise) {
    console.log('New worker started a job');
});

updateCreditQueue.on('drained', function () {
    console.log('Job queue is currently empty');
});

module.exports = { queueCredit }
