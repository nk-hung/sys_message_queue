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
    }
}

module.exports = messageService
