const axios = require ('axios');

const baseURL = 'https://api.spacexdata.com'

const api = axios.create({
    baseURL,
})

const get = async (endpoint) => {
    try {
        const response = await api.get(endpoint);

        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } 

        throw new Error(`API Error: ${response.status} - ${response.statusText}`);        
    } catch (error) {
        console.log("Error: ", error.message);
        throw error;
    }
}

module.exports = {
    get,
}