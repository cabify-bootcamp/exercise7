const Message = require("../models/message");
const updateCreditTransaction = require("../transactions/updateCredit");
const saveMessageTransaction = require("../transactions/saveMessage");
<<<<<<< HEAD
// const updateCreditTransaction = require("../transactions/updateCredit");
var Queue = require('bull');
const updateCreditQueue = new Queue('creditQueue');
=======
>>>>>>> parent of 3828dbd... getCredit independent

module.exports = function(messageParams, cb) {
  const MessageModel = Message();
  let message = new MessageModel(messageParams);

<<<<<<< HEAD
  console.log('asdasdasd')

  const queueCredit = function(message) {

    let messageObj = message;
    return updateCreditQueue.add(messageObj).then( (job) => console.log(job, '------------------------------------'))

  }

  queueCredit(messageParams) 

  if (message.status == "OK") {

    //post to edit transaction
    // updateCreditTransaction(
    //   {
    //     amount: { $gte: 1 },
    //     location: message.location.name
    //   },
    //   {
    //     $inc: { amount: -message.location.cost }
    //   },
    //   function(doc, error) {
    //     if (error) {
    //       return cb(undefined, error);
    //     } else if (doc == undefined) {
    //       let error = "Not enough credit";
    //       console.log(error);
    //       cb(undefined, error);
    //     } else {
    //       saveMessageTransaction(messageParams, cb);
    //     }
    //   }
    // );
=======

  if (message.status == "OK") {
    updateCreditTransaction(
      {
        amount: { $gte: 1 },
        location: message.location.name
      },
      {
        $inc: { amount: -message.location.cost }
      },
      function(doc, error) {
        if (error) {
          return cb(undefined, error);
        } else if (doc == undefined) {
          let error = "Not enough credit";
          console.log(error);
          cb(undefined, error);
        } else {
          saveMessageTransaction(messageParams, cb);
        }
      }
    );
>>>>>>> parent of 3828dbd... getCredit independent
  } else {
    saveMessageTransaction(messageParams, cb);
  }
};
