const { connectToRabbitMQForTest } = require("../dbs/init.rabbit");

describe('rabbitmq connect', () => { 
    test('should connect to successfull rabbitMQ', async () => {
        const result = await connectToRabbitMQForTest()
        expect(result).toBeUndefined()
    })
 })
