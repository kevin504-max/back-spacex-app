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
            return await Launch.findOne({ launchId: launchId });
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

    setLaunchesId (launches) {
        let firstLaunch = 0;

        launches.forEach(async (launch) => {
            Object.assign(launch, { launchId: firstLaunch++ });
        });

        return launches;
    }   
}