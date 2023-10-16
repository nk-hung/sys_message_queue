const { consumerToQueue } = require('./src/services/consumerQueue.service');

const queueName = 'topic';

consumerToQueue(queueName).then(() => {
    console.log(`Consumer started:: ${queueName}`)
}).catch(err => {
    console.error(`Error Consumer:: ${err}`)
})