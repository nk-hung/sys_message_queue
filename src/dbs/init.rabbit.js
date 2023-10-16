const amqp = require('amqplib');

const connectToRabbitMQ = async () => {
    try {
        const connection = await amqp.connect('amqp://guest:12345@localhost');
        if (!connection) throw new Error('Connection Failed!')
        const channel = await connection.createChannel()
        return { channel, connection }
    } catch (err) {

    }
}

const connectToRabbitMQForTest = async () => {
    try {
       const { channel, connection } = await connectToRabbitMQ();
       const queue = 'test-topic'
       const messages = 'Helo boiA!!!';

       // channel: A virtual connection inside a connection
       await channel.assertQueue(queue);
       await channel.sendToQueue(queue, Buffer.from(messages))

       // close connection
       await connection.close()

    } catch (error) {
       console.log(error) 
    }
}

    const consumerQueue = async (channel, queueName ) => {
        try {
            await channel.assertQueue(queueName, { 
                durable: true
            });

            channel.consume(queueName, (msg) => {
                console.log(`Message received::: ${msg.content.toString()}`)
                // 1. Find all User follow Shop
                // 2. Send message to user
                // 3. yes, ok => success
                // 4. error, set DLX ... (dead latest exchange)
            }, {
                noAck: true
            })

        } catch (error) {
           console.log(error) 
        }
    }

module.exports = {
    connectToRabbitMQ,
    connectToRabbitMQForTest,
    consumerQueue
}