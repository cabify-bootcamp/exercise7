const http = require("http");
const uuidv4 = require('uuid/v4')
const Queue = require('bull');

const creditCheckQueue = new Queue('creditCheckQueue', 'redis://127.0.0.1:6379');
const creditCheckResponseQueue = new Queue('creditCheckResponseQueue', 'redis://127.0.0.1:6379');

const getCredit = require("./getCredit");


creditCheckQueue.process(async (job, done) => {
    Promise.resolve(getCredit().then( credit => {
        done(null, credit)}))
})


creditCheckQueue.on('completed', (job, result) => {
    let messageParams = job.data
    messageParams.credit = result
    message = JSON.stringify(messageParams)
    creditCheckResponseQueue.add(messageParams)
})

creditCheckQueue.on('active', function (job, jobPromise) {
    console.log('New worker started for a Credit Check a job');
});

creditCheckQueue.on('drained', function () {
    console.log('Credit Check Job queue is currently empty');
});


