import axios from "axios";
import { apikey } from "../constVar/const.js";

const forcastEndPoint = ({ cityLocation, days })=> `https://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${cityLocation}&days=${days}&aqi=no&alerts=no`;
const locationEndPoint = ({ cityLocation })=> `https://api.weatherapi.com/v1/search.json?key=${apikey}&q=${cityLocation}`;
const hourlyForcastEndPoint =  ({ cityLocation })=> `https://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${cityLocation}&days=3&aqi=no&alerts=no`;

const apiCall = async (endpoint) => {
    const options = {
        method: "GET",
        url: endpoint
    } 
    try {
        const response = await axios.request(options);
        return response.data;
    }
    catch(error) {
        console.log("error: " + error);
        return null;
    }
}

export const fetchForcast = ({ cityLocation, days }) => {
    let forcastURL = forcastEndPoint({ cityLocation, days });
    return apiCall(forcastURL);
}

export const fetchLocation = ({ cityLocation }) => {
    let locationURL = locationEndPoint({ cityLocation });
    return apiCall(locationURL);
}

export const fetchHourlyForcast = ({ cityLocation }) => {
    let hourlyForcastURL = hourlyForcastEndPoint({ cityLocation });
    return apiCall(hourlyForcastURL);
}