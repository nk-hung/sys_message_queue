const { consumerToQueue , consumerQueueNormal, consumerToQueueFailed} = require('./src/services/consumerQueue.service');

const queueName = 'topic';

// consumerToQueue(queueName).then(() => {
//     console.log(`Consumer started:: ${queueName}`)
// }).catch(err => {
//     console.error(`Error Consumer:: ${err}`)
// })

consumerQueueNormal(queueName).then(() => {
    console.log('Message consumerQueueNormal started')
}).catch((err) => {
    console.error('Normal::', err)
})

consumerToQueueFailed(queueName).then(() => {
    console.log('Message consumerToQueueFailed started')
}).catch((err) => {
    console.error('Failed ::', err)
})