import axios from 'axios';
import { fetchForcast, fetchLocation, fetchHourlyForcast } from '../api/forcast.js';
import { apikey } from "../constVar/const.js";


let cityLocation = "Milan";
let days = 3;

jest.mock('axios');

beforeEach(() => {
    jest.spyOn(console, 'log');
  });
  
  afterEach(() => {
    console.log.mockRestore();
    jest.resetAllMocks();
  });

describe('apiCall', () => {
test('should make a GET request to the specified endpoint', async () => {
    let endpoint = `https://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${cityLocation}&days=${days}&aqi=no&alerts=no`;
    const responseData = {
        data: {},
        status: 200, 
    };
    axios.request.mockResolvedValueOnce(responseData);

    let result = await fetchForcast({cityLocation, days});

    console.log(result);

    expect(axios.request).toHaveBeenCalledTimes(1);
    expect(axios.request).toHaveBeenCalledWith({
        method: 'GET',
        url: endpoint,
    });
});

  test('should return null and log an error if the request fails', async () => {
    cityLocation = 'Rome'; 
    days = 5; 
    let endpoint = `https://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${cityLocation}&days=${days}&aqi=no&alerts=no`;
    const error = new Error('Request failed');
    axios.request.mockRejectedValueOnce(error);

    let result = await fetchForcast({cityLocation, days});
    expect(axios.request).toHaveBeenCalledTimes(1);
    expect(axios.request).toHaveBeenCalledWith({
      method: 'GET',
      url: endpoint,
    });
    expect(result).toBeNull();
    expect(console.log).toHaveBeenCalledWith('error: ' + error);
  });
});



describe('fetchLocation', () => {
    test('should make a GET request to the location endpoint', async () => {
        let cityLocation = "Milan";
        let endpoint = `https://api.weatherapi.com/v1/search.json?key=${apikey}&q=${cityLocation}`;
        const responseData = {
            data: {},
            status: 200,
        };
        axios.request.mockResolvedValueOnce(responseData);

        const result = await fetchLocation({ cityLocation });

        expect(axios.request).toHaveBeenCalledTimes(1);
        expect(axios.request).toHaveBeenCalledWith({
            method: 'GET',
            url: endpoint,
        });
        expect(result).toEqual(responseData.data);
    });

    test('should return null and log an error if the request fails', async () => {
        let cityLocation = 'Rome';
        let endpoint = `https://api.weatherapi.com/v1/search.json?key=${apikey}&q=${cityLocation}`;
        const error = new Error('Request failed');
        axios.request.mockRejectedValueOnce(error);

        const result = await fetchLocation({ cityLocation });

        expect(axios.request).toHaveBeenCalledTimes(1);
        expect(axios.request).toHaveBeenCalledWith({
            method: 'GET',
            url: endpoint,
        });
        expect(result).toBeNull();
        expect(console.log).toHaveBeenCalledWith('error: ' + error);
    });
});describe('fetchHourlyForcast', () => {
  test('should make a GET request to the hourly forecast endpoint', async () => {
    const cityLocation = 'Milan';
    const hourlyForcastURL = `https://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${cityLocation}&days=3&aqi=no&alerts=no`;
    const responseData = {
      data: {},
      status: 200,
    };
    axios.request.mockResolvedValueOnce(responseData);

    const result = await fetchHourlyForcast({ cityLocation });

    expect(axios.request).toHaveBeenCalledTimes(1);
    expect(axios.request).toHaveBeenCalledWith({
      method: 'GET',
      url: hourlyForcastURL,
    });
    expect(result).toEqual(responseData.data);
  });

  test('should return null and log an error if the request fails', async () => {
    const cityLocation = 'Rome';
    const hourlyForcastURL = `https://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${cityLocation}&days=3&aqi=no&alerts=no`;
    const error = new Error('Request failed');
    axios.request.mockRejectedValueOnce(error);

    const result = await fetchHourlyForcast({ cityLocation });

    expect(axios.request).toHaveBeenCalledTimes(1);
    expect(axios.request).toHaveBeenCalledWith({
      method: 'GET',
      url: hourlyForcastURL,
    });
    expect(result).toBeNull();
    expect(console.log).toHaveBeenCalledWith('error: ' + error);
  });
});