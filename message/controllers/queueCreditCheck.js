const http = require("http");
const uuidv4 = require('uuid/v4')
const Queue = require('bull');

const creditCheckQueue = new Queue('creditCheckQueue', 'redis://127.0.0.1:6379');
const creditCheckResponseQueue = new Queue('creditCheckResponseQueue', 'redis://127.0.0.1:6379');

const queueCreditCheck = function(req, res, next) {
    let uuid = uuidv4();
    let messageObj = req.body;
    messageObj.uuid = uuid;
    messageObj.status = "PENDING"
    
    return creditCheckQueue.add(messageObj).then( () => res.status(200).send(`Message send successfully, you can check the your message status using /messages/${uuid}/status`))
    
}

creditCheckResponseQueue.process(async (job, done) => {
    done(null, job.data)
})

creditCheckResponseQueue.on('completed', (job, result) => {
    checkMessage = JSON.stringify(result)
    console.log(` 1 Credit Check Job completed with result ${checkMessage}`);
    if (result.credit > 1){
        results(result)
    }
})

const results = (msg) => {
    console.log(msg)
}


module.exports = { queueCreditCheck }
