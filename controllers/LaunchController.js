const { LaunchService } = require('../services');
const launchService = new LaunchService();
const launchesJSON = require('../launches.json');

module.exports = class LaunchController {
    registerLaunches = async (request, response) => {
        try {
            const launches = this.getLaunchesFromJSON(launchesJSON);
            const launchesParams = { launches: launches };
            const launchesRegistered = await launchService.getLaunches();

            this.verifyLaunchesRegistered(launchesRegistered);

            await launchService.registerLaunches(launchesParams);
            return response.status(200).json({ message: `Arquivo importado com sucesso!` });
        } catch (error) {
            console.error("Error: ", error);
            response.status(400).json({ message: `Algo deu errado! Tente novamente.` });
        }
    }

    getLaunches = async (request, response) => {
        try {
            const launches = await launchService.getLaunches();
            
            if (! launches || launches.length === 0) {
                return response.status(400).json({ message: `Nenhum lançamento encontrado.` });
            } else if (Object.keys(launches).length === 0) {
                return response.status(204).json({ message: `Nenhum lançamento encontrado.` });
            }

            return response.status(200).json({ launches: launches });

        } catch (error) {
            console.error("Error: ", error);
            response.status(400).json({ message: `Algo deu errado! Tente novamente.` });
        }
    }

    findLaunch = async (request, response) => {
        try {
            const launch = await launchService.findLaunch(request.params.launchId);

            if (! launch) {
                return response.status(400).json({ message: `Lançamento não encontrado.` });
            } else if (Object.keys(launch).length === 0) {
                return response.status(204).json({ message: `Lançamento não encontrado.` });
            }

            return response.status(200).json({ launch: launch });
        } catch (error) {
            console.error("Error: ", error);
            response.status(400).json({ message: `Algo deu errado! Tente novamente.` });
        }
    }

    getLaunchesData = async (request, response) => {
        try {
            const { launchesData, launchesByYear } = await launchService.getLaunchesData();

            return response.status(200).json({ launchesData, launchesByYear });
        } catch (error) {
            console.error("Error: ", error);
            response.status(400).json({ message: `Algo deu errado! Tente novamente.` });
        }
    }

    getLaunchesFromJSON = (jsonFile) => {
        return jsonFile.results;
    }

    verifyLaunchesRegistered(launchesRegistered) {
        if (launchesRegistered.length > 0) {
            return 'O arquivo já foi importado anteriormente.';
        } 
    }
}