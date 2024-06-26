import axios from 'axios';


const AppAPI = axios.create({
    baseURL: 'https://memoria-back-ten.vercel.app/api'
    // baseURL: 'http://localhost:4000/api'
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



