const mongoose = require('mongoose');

const connectString = 'mongodb://localhost:27017/mdb';

const testSchema = new mongoose.Schema({
    name: String
})

const Test = mongoose.model('test', testSchema)


describe('Test MongoDB', () => {
    // test('Should connect MongoDB', async () => {
        let connection;

        beforeAll(async () => {
            connection = await mongoose.connect(connectString)
        })

        afterAll(async() => {
            await connection.disconnect()
        })

        it('should connect to mongodb', () => {
            expect(mongoose.connection.readyState).toBe(1)
        })

        it('should save a document',async () => {
            const test = new Test({name: 'test-topic'})
            await test.save()
            expect(test.isNew).toBe(false)
        })

        it('find user', async () => {
            const user = await Test.findOne({name: 'test-topic'});
            expect(user).toBeDefined();
            expect(user.name).toBe('test-topic')
        })

    // })
})