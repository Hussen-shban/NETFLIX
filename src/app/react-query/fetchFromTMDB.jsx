import axios from 'axios'


const API_KEY = "8232b5887817018c2fefda7cd4cfbba1"
const BASE_URL = 'https://api.themoviedb.org/3'
export const fetchFromTMDB = async (endpoint, params = {}) => {
    const { data } = await axios.get(`${BASE_URL}/${endpoint}`, {
        params: {
            api_key: API_KEY,
            language: 'en-US',
            ...params,
        }
    })
    return data
}
