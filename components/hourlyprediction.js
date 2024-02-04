
apiExample = require('../constVar/forcast_example_responsebody.json')

const currentTimeEpoch = apiExample.location.localtime_epoch;

var DATA = [
    {
        title: '',
        data: []
    },
    {
        title: '',
        data: []
    },
    {
        title: '',
        data: []
    }
];

for (let i = 0; i < 3; i++) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const in2Days = new Date(today);
    in2Days.setDate(in2Days.getDate() + 2);
    
    DATA[i].title = i === 0 ? 'Today, ' + today.toLocaleDateString() : i === 1 ? 'Tomorrow, ' + tomorrow.toLocaleDateString() : 'In 2 days, ' + in2Days.toLocaleDateString();
    
    for (const hour of Object.keys(apiExample.forecast.forecastday[i].hour)) {
        
        const timeEpoch = apiExample.forecast.forecastday[i].hour[hour].time_epoch;
        const time = new Date(timeEpoch * 1000).getHours();
        // const weatherIcon = apiExample.forecast.forecastday[i].hour[hour].condition.icon;
        const weatherDescription = apiExample.forecast.forecastday[i].hour[hour].condition.text;
        const temperature_c = apiExample.forecast.forecastday[i].hour[hour].temp_c;
        // const temperature_f = apiExample.forecast.forecastday[i].hour[hour].temp_f;
        const precipitation = apiExample.forecast.forecastday[i].hour[hour].precip_mm;
        const wind = apiExample.forecast.forecastday[i].hour[hour].wind_kph;
        
        if (apiExample.forecast.forecastday[i].hour[hour].time_epoch > currentTimeEpoch) {
            DATA[i].data.push([time, weatherDescription, temperature_c, precipitation, wind].join(' - '));
        }
    }
}

console.log("data: ", DATA);

export {DATA};

// goal is to export a list with this form
// const DATA = [
//     {
//       title: 'Today, [date]',
//       data: [['time', 'weather-icon', 'temperature', 'precipitation', 'wind'],
//      ['14', sun-icon, '14', '0.0mm', '2m/s'], 
//      ['15', slightly-cloudy-icon, '14', '0.0mm', '3m/s'],
//      ...
//      ['23', moon-icon, '7', '0.0mm', '4m/s'],
//      '],
//     },
//     {
//       title: 'Tomorrow [date]',
//       data: ['...'],
//     },
//     {
//       title: 'In 2 days',
//       data: ['...'],
//     },
//   ];
