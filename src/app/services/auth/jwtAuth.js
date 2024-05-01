import jwtAxios from "axios";

const jwtAuthAxios = jwtAxios.create({
    // baseURL: "http://localhost:8080",
    baseURL: "http://20.41.114.120:8080",
    headers: {
        'Content-Type': 'application/json'
    }
});

// export const kakapAPIKey = '3d4ee2b68f4b4a1b7f6874c563d1c691' //local
// export const kakapAPIKey = '082e38f1a253e1f60f34eaff25fb9385' //Live

jwtAuthAxios.interceptors.request.use(
    function (config) {
        config.headers = {
            ...config.headers
        }
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
);

jwtAuthAxios.interceptors.response.use(
    function (response) {
        if (response?.status === 401) {
            localStorage.removeItem('token')
            window.location?.replace("/")
        }
        return Promise.resolve(response)
    },
    async function (err) {
        if (err?.response?.status === 400 || err?.response?.status === 500 || err?.response?.status === 409) {
            return Promise.reject(err?.response?.data)
        }
        else if (err?.response?.status === 401) {
            localStorage.removeItem('token')
            window.location?.replace("/")
            console.log('response in interceptor line number 53');
        } else if (err?.response?.status === 403) {
            localStorage.removeItem('token')
            window.location?.replace("/")
            console.log('response in interceptor line number 53');
        } else {
            console.log('response in interceptor line number 82');
            return err;
        }
    }
);

export const setAuthToken = (token) => {
    if (token) {
        jwtAuthAxios.defaults.headers.common['Authorization'] = token;
        sessionStorage.setItem('token', token);
    } else {
        delete jwtAuthAxios.defaults.headers.common['Authorization'];
        sessionStorage.removeItem('token');
    }
};

export const getAuthToken = () => {
    return sessionStorage.getItem("token");
};

export default jwtAuthAxios;

// Weather Api 
export const WEATHER_API_KEY = '5d519472e191015e1b7549761c7015ec';
export const OPEN_WEATHER_API = 'https://api.openweathermap.org/data/2.5';
export const DAILY_FORECAST_API_URL = `${OPEN_WEATHER_API}/forecast/daily`; //seven days api
export const WEATHER_API_URL = `${OPEN_WEATHER_API}/weather`; //single day WEATHER api
export const FORECAST_API_URL = `${OPEN_WEATHER_API}/forecast`; //forecast api