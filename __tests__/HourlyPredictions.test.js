import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HourlyPredictions from '../screens/HourlyPredictions';
import { generateData } from "../screens/HourlyPredictions";

const apiExample = require('../constVar/forcast_example_responsebody.json');

describe('generateData', () => {
  it('should generate the correct data array', () => {
    const apiResponse = apiExample; 

    const currentTimeEpoch = apiResponse.location.localtime_epoch;

    const expectedData = [
      {
        title: 'Today, 4.2.2024' ,
        data: [["10","//cdn.weatherapi.com/weather/64x64/day/113.png",9.2,0,"3.2↙"]
        ,["11", "//cdn.weatherapi.com/weather/64x64/day/113.png", 10.6, 0, "3.2↙"]
      ,["12", "//cdn.weatherapi.com/weather/64x64/day/113.png", 11.8, 0, "3.6↙"],
      ["13", "//cdn.weatherapi.com/weather/64x64/day/113.png", 12.8, 0, "4.7↙"],
      ["14", "//cdn.weatherapi.com/weather/64x64/day/113.png", 13.5, 0, "5↙"],
      ["15", "//cdn.weatherapi.com/weather/64x64/day/113.png", 13.9, 0, "4.7←"],
      ["16", "//cdn.weatherapi.com/weather/64x64/day/113.png", 13.7, 0, "5↙"],
      ["17", "//cdn.weatherapi.com/weather/64x64/day/113.png", 12.5, 0, "5←"],
      ["18", "//cdn.weatherapi.com/weather/64x64/night/113.png", 11.5, 0, "5.8←"],
      ["19", "//cdn.weatherapi.com/weather/64x64/night/113.png", 11, 0, "6.1↖"],
      ["20", "//cdn.weatherapi.com/weather/64x64/night/113.png", 10.5, 0, "6.8←"],
      ["21", "//cdn.weatherapi.com/weather/64x64/night/113.png", 10, 0, "7.9←"],
      ["22", "//cdn.weatherapi.com/weather/64x64/night/113.png", 9.5, 0, "7.6←"],
      ["23", "//cdn.weatherapi.com/weather/64x64/night/113.png", 9, 0, "7.6↙"]
]
      },
      {
        title: 'Tomorrow, 5.2.2024',
        data: [
          [ "00", "//cdn.weatherapi.com/weather/64x64/night/113.png", 8.6, 0, "7.2↙" ],
          [ "01", "//cdn.weatherapi.com/weather/64x64/night/113.png", 8.3, 0, "6.8↙" ],
          [ "02", "//cdn.weatherapi.com/weather/64x64/night/113.png", 8, 0, "6.5↙" ],
          [ "03", "//cdn.weatherapi.com/weather/64x64/night/113.png", 7.7, 0, "6.5↙" ],
          [ "04", "//cdn.weatherapi.com/weather/64x64/night/113.png", 7.5, 0, "6.5←" ],
          [ "05", "//cdn.weatherapi.com/weather/64x64/night/113.png", 7.4, 0, "6.1←" ],
          [ "06", "//cdn.weatherapi.com/weather/64x64/night/113.png", 7.2, 0, "6.1←" ],
          [ "07", "//cdn.weatherapi.com/weather/64x64/night/113.png", 7, 0, "6.1↙" ],
          [ "08", "//cdn.weatherapi.com/weather/64x64/day/113.png", 7, 0, "5.8←" ],
          [ "09", "//cdn.weatherapi.com/weather/64x64/day/113.png", 7.8, 0, "4.3←" ],
          [ "10", "//cdn.weatherapi.com/weather/64x64/day/113.png", 9.3, 0, "3.6↙" ],
          [ "11", "//cdn.weatherapi.com/weather/64x64/day/113.png", 10.6, 0, "4.3↙" ],
          [ "12", "//cdn.weatherapi.com/weather/64x64/day/113.png", 11.8, 0, "5.4↙" ],
          [ "13", "//cdn.weatherapi.com/weather/64x64/day/116.png", 12.8, 0, "6.8↙" ],
          [ "14", "//cdn.weatherapi.com/weather/64x64/day/113.png", 13.5, 0, "6.5↙" ],
          [ "15", "//cdn.weatherapi.com/weather/64x64/day/116.png", 13.9, 0, "5.4↙" ],
          [ "16", "//cdn.weatherapi.com/weather/64x64/day/116.png", 13.8, 0, "3.6↙" ],
          [ "17", "//cdn.weatherapi.com/weather/64x64/day/116.png", 12.7, 0, "2.2↘" ],
          [ "18", "//cdn.weatherapi.com/weather/64x64/night/116.png", 11.6, 0, "3.2↘" ],
          [ "19", "//cdn.weatherapi.com/weather/64x64/night/116.png", 10.9, 0, "3.6↘" ],
          [ "20", "//cdn.weatherapi.com/weather/64x64/night/116.png", 10.3, 0, "3.6↘" ],
          [ "21", "//cdn.weatherapi.com/weather/64x64/night/116.png", 9.9, 0, "2.9↘" ],
          [ "22", "//cdn.weatherapi.com/weather/64x64/night/119.png", 9.6, 0, "1.8↘" ],
          [ "23", "//cdn.weatherapi.com/weather/64x64/night/119.png", 9.4, 0, "1.8→" ]
        ]

      },
      {
        title: 'In 2 days, 6.2.2024' ,
        data: [
          ["00", "//cdn.weatherapi.com/weather/64x64/night/119.png", 9.1, 0, "2.5→"],
          ["01", "//cdn.weatherapi.com/weather/64x64/night/119.png", 8.8, 0, "2.9↘"],
          ["02", "//cdn.weatherapi.com/weather/64x64/night/122.png", 8.5, 0, "2.9↘"],
          ["03", "//cdn.weatherapi.com/weather/64x64/night/122.png", 8.3, 0, "2.5↘"],
          ["04", "//cdn.weatherapi.com/weather/64x64/night/122.png", 8.5, 0, "2.5↓"],
          ["05", "//cdn.weatherapi.com/weather/64x64/night/119.png", 8.6, 0, "2.9↙"],
          ["06", "//cdn.weatherapi.com/weather/64x64/night/176.png", 8.6, 0.01, "3.2↙"],
          ["07", "//cdn.weatherapi.com/weather/64x64/night/122.png", 8.6, 0, "2.9↙"],
          ["08", "//cdn.weatherapi.com/weather/64x64/day/122.png", 8.6, 0, "3.2↙"],
          ["09", "//cdn.weatherapi.com/weather/64x64/day/122.png", 8.9, 0, "3.2↙"],
          ["10", "//cdn.weatherapi.com/weather/64x64/day/122.png", 9.4, 0, "3.6↙"],
          ["11", "//cdn.weatherapi.com/weather/64x64/day/119.png", 9.9, 0, "4↙"],
          ["12", "//cdn.weatherapi.com/weather/64x64/day/119.png", 10.6, 0, "4.3↙"],
          ["13", "//cdn.weatherapi.com/weather/64x64/day/116.png", 11.2, 0, "4.3←"],
          ["14", "//cdn.weatherapi.com/weather/64x64/day/116.png", 11.8, 0, "4.3←"],
          ["15", "//cdn.weatherapi.com/weather/64x64/day/116.png", 12, 0, "4.3←"],
          ["16", "//cdn.weatherapi.com/weather/64x64/day/116.png", 11.9, 0, "3.2←"],
          ["17", "//cdn.weatherapi.com/weather/64x64/day/116.png", 11.3, 0, "2.9↖"],
          ["18", "//cdn.weatherapi.com/weather/64x64/night/116.png", 10.6, 0, "2.2↖"],
          ["19", "//cdn.weatherapi.com/weather/64x64/night/119.png", 10.3, 0, "1.4←"],
          ["20", "//cdn.weatherapi.com/weather/64x64/night/119.png", 10, 0, "0.4↙"],
          ["21", "//cdn.weatherapi.com/weather/64x64/night/122.png", 9.8, 0, "1.8↙"],
          ["22", "//cdn.weatherapi.com/weather/64x64/night/122.png", 9.6, 0, "1.4↙"],
          ["23", "//cdn.weatherapi.com/weather/64x64/night/122.png", 9.6, 0, "1.1↙"]
        ]
      }
    ];

    const result = generateData(apiResponse);
    expect(result).toEqual(expectedData);

  });
});