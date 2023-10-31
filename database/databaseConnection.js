require("dotenv").config();
const mongoose = require('mongoose')

async function connect() {
    try {
        mongoose.set('strictQuery', true);

        await mongoose.connect(`
            mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.aai6u7s.mongodb.net/
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