const express = require ('express')
const cors = require ('cors')
const helmet = require ('helmet')
const compression = require ('compression')
const cookieParser = require ('cookie-parser')

class ApiServer {
    constructor () {}

    restApiConfiguration = async () => {
        const app = express();
        app.use(helmet());
        app.use(compression());
        app.use(cookieParser());
        app.use(cors({ origin: true, credentials: true}));
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.use('/api/', require('../router/launchesRoutes.js'))
        app.get('/', (request, response) => {
            response.status(200).json({ message: 'Fullstack Challenge 🏅 - Space X API'})
        });

        this.app = app;
    }

    initialize = async () => {
        return this.app;
    }

    getApplication = () => {
        return this.app;
    }
}

module.exports = ApiServer;