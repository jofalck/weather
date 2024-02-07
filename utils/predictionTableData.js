import { getWindDirectionIcon } from './windDirection';

export const generateData = (apiResponse) => {
    const currentTimeEpoch = apiResponse.location.localtime_epoch;
  
    const DATA = [
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
      const todayEpoch = apiResponse.forecast.forecastday[0].date_epoch;
      const tomorrowEpoch = apiResponse.forecast.forecastday[1].date_epoch;
      const in2DaysEpoch = apiResponse.forecast.forecastday[2].date_epoch;
  
      const today = new Date(todayEpoch * 1000);
      const tomorrow = new Date(tomorrowEpoch * 1000);
      const in2Days = new Date(in2DaysEpoch * 1000);
  
      DATA[i].title = i === 0 ? 'Today, ' + today.toLocaleDateString() : i === 1 ? 'Tomorrow, ' + tomorrow.toLocaleDateString() : 'In 2 days, ' + in2Days.toLocaleDateString();
  
      for (const hour of Object.keys(apiResponse.forecast.forecastday[i].hour)) {
  
        const timeEpoch = apiResponse.forecast.forecastday[i].hour[hour].time_epoch;
        const time = new Date(timeEpoch * 1000).getHours();
        const weatherIcon = apiResponse.forecast.forecastday[i].hour[hour].condition.icon;
        const weatherDescription = apiResponse.forecast.forecastday[i].hour[hour].condition.text;
        const temperature_c = apiResponse.forecast.forecastday[i].hour[hour].temp_c;
        // const temperature_f = apiResponse.forecast.forecastday[i].hour[hour].temp_f;
        const precipitation = apiResponse.forecast.forecastday[i].hour[hour].precip_mm;
        const wind = apiResponse.forecast.forecastday[i].hour[hour].wind_kph;
        const wind_dir = apiResponse.forecast.forecastday[i].hour[hour].wind_dir;
  
        const windDirectionIcon = getWindDirectionIcon(wind_dir);
  
        if (apiResponse.forecast.forecastday[i].hour[hour].time_epoch > currentTimeEpoch) {
          DATA[i].data.push([("0" + time).slice(-2), weatherIcon, temperature_c, precipitation, wind + windDirectionIcon]);
        }
      }
    }
  
    return DATA;
  };