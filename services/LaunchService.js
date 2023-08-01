const { Launch } = require('../models/Launch')

module.exports = class LaunchService {
    constructor () {}

    registerLaunches = async params => {
        try {
            const { launches } = params;
            const launchesToRegister = this.setLaunchesId(launches);

            return await Launch.create(launchesToRegister);
        } catch (error) {
            console.log("Error: ", error);
            throw `Error: ${error}`
        }
    }

    getLaunches = async () => {
        try {
            return await Launch.find();
        } catch (error) {
            console.log("Error: ", error);
            throw `Error: ${error}`
        }
    }

    findLaunch = async launchId => {
        try {
            return await Launch.findOne({ id: launchId });
        } catch (error) {
            console.log("Error: ", error);
            throw `Error: ${error}`
        }
    }

    setLaunchesId (launches) {
        let firstLaunch = 0;

        launches.forEach(async (launch) => {
            Object.assign(launch, { id: firstLaunch++ });
        });

        return launches;
    }   
}