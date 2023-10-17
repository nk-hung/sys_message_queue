const { connectToRabbitMQ, consumerQueue } = require("../dbs/init.rabbit")

const messageService = {
    consumerToQueue: async (queueName) => {
        try {
            const { channel } = await connectToRabbitMQ()
            console.log('Waiting to start ...')
            await consumerQueue( channel, queueName );
        } catch (error) {
           console.log(error) 
        }
    },
    consumerQueueNormal: async (queueName) => {
        try {
            const  {channel, connection } = await connectToRabbitMQ();
            const notiQueue = 'notificationQueueProcess' // assert Queue
            const timeExpired = 5000;

            setTimeout(() => {
                channel.consume(notiQueue, msg => {
                    console.log(`SEND multi Queue successfully!!`, msg.content.toString());
                    channel.ack(msg)
                }, {
                    noAsk: false
                })
            }, timeExpired)
        } catch (error) {
           console.log(`Normal consumer error :::, ${error}`) 
        }
    },

    // Failed
    consumerToQueueFailed: async (queueName) => {
        try {
            const { channel } = await connectToRabbitMQ();
            
            const notificationExchangeDLX = 'notificationExDLX';
            const notificationRoutingKeyDLX = 'notificationRoutingKeyDLX';
            const notiQueueHandler = 'notificationQueueHotFix'            

            const notiQueue = await channel.assertExchange(notificationExchangeDLX, 'direct', {
                durable: true
            })

            const queueResult = await channel.assertQueue(notiQueueHandler, {
                exclusive: false
            });
            console.log({ queueResult })
            await channel.bindQueue(queueResult.queue, notificationExchangeDLX, notificationRoutingKeyDLX);
            await channel.consume(queueResult.queue, msgFailed => {
                console.log(`This notification error, pls hot fix ::: ${msgFailed.content.toString()}`)
            }, {
                noAsk: false
            })
        } catch (error) {
           console.error(`Fail consummer:: ${error}`) 
           throw error
        }
    }
}

module.exports = messageService
