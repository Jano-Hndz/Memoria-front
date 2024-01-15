import axios from 'axios';

const key = (import.meta.env.MODE === 'development') ?
    'http://localhost:3500/api' :
    'https://anima-backend.azurewebsites.net/api';

const AppAPI = axios.create({
    baseURL: 'http://localhost:4000/api'
});

// Todo: configurar interceptores
AppAPI.interceptors.request.use( config => {

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config;
})


export default AppAPI;



