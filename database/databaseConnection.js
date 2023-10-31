const env = require('../.env')
const mongoose = require('mongoose')

async function connect() {
    try {
        mongoose.set('strictQuery', true);

        await mongoose.connect(`
            mongodb+srv://${env.dbUser}:${env.dbPassword}@cluster0.aai6u7s.mongodb.net/
        `, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Conexão com o banco de dados efetuado com sucesso!');
    } catch (error) {
        console.log("Error: ", error);
    }
}

module.exports = { connect }