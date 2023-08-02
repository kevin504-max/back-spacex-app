const cron = require('node-cron');
const SpaceXAPI = require('../helpers/apiSpaceX');
const mongoose = require('mongoose');
const LaunchModel = mongoose.model('Launch');
const isEqual = require('lodash/isEqual');

const fetchAndSaveLaunches = async () => {
    try {
        const launches = await SpaceXAPI.get('/v4/launches');

        const launchesIds = launches.map(launch => launch.id);
        const launchesInDatabase = await LaunchModel.find({ id: { $in: launchesIds } });
        const launchesIdsInDatabase = new Set(launchesInDatabase.map(launch => launch.id));

        const newLaunches = launches.filter(launch => !launchesIdsInDatabase.has(launch.id));
        const updatedLaunches = launches.filter(launch => launchesIdsInDatabase.has(launch.id));

        if (newLaunches.length > 0) {
            await LaunchModel.bulkWrite(newLaunches.map(launch => ({
                insertOne: {
                    document: { ...launch, launchId: launchesIds[launchesIds.length - 1] + 1 },
                }
            })));

            console.log("Novos lançamentos registrados com sucesso!");
        } else {
            console.log("Não há novos a lançamentos registrar!");
        }

        if (updatedLaunches.length > 0) {
            await Promise.all(updatedLaunches.map(async (launch) => {
                const launchInDatabase = await LaunchModel.findOne({ id: launch.id });

                if (launchInDatabase && !isEqual(launch, launchInDatabase)) {
                    for (const prop in launch) {
                        if (launch.hasOwnProperty(prop) && !isEqual(launch[prop], launchInDatabase[prop])) {
                            launchInDatabase[prop] = launch[prop];
                        }
                    }

                    await launchInDatabase.save();
                } else {
                    console.log(`Lançamento ${launch.id} não encontrado no banco de dados!`);
                }
            }));

            console.log("Lançamentos atualizados com sucesso!");
        } else {
            console.log("Não há lançamentos para atualizar!");
        }
    } catch (error) {
        console.error("Erro ao buscar e salvar lançamentos: ", error.message);        
    }
}

cron.schedule('0 9 * * *', fetchAndSaveLaunches);