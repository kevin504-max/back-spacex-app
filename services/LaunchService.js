const { Launch } = require('../models/Launch')

module.exports = class LaunchService {
    constructor () {}

    registerLaunches = async params => {
        try {
            const { launches } = params;

            return await Launch.create(launches);
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

    getLaunchesData = async () => {
        try {
            const launches = await this.getLaunches();
            const launchesData = {
                total: launches.length,
                success: launches.filter(launch => launch.success === true).length,
                failed: launches.filter(launch => launch.success === false).length,
            };

            const launchesByYear = launches.reduce((acc, launch) => {
                const { date_local } = launch;
                const year = date_local.split('-')[0];

                acc[year] = (acc[year] || 0) + 1;

                return acc;
            }, {});

            return { launchesData, launchesByYear };
        } catch (error) {
            console.log("Error: ", error);
            throw `Error: ${error}`
        }
    }   
}