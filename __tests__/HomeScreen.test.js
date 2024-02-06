// import HomeScreen from '../screens/HomeScreen';
// import { render, fireEvent, waitFor, getByTestId, screen } from '@testing-library/react-native';

// describe('HomeScreen', () => {
//   test('handleLocation function should fetch forecast data and update state', async () => {
//     const mockLocation = {"country": "Italie", "id": 1286276, "lat": 43.82, "lon": 7.77, "name": "Sanremo", "region": "Liguria", "url": "sanremo-liguria-italie"};
//     const mockForecastData = {"current": {"cloud": 50, "condition": {"code": 1003, "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png", "text": "Partly cloudy"}, "feelslike_c": 13.2, "feelslike_f": 55.7, "gust_kph": 13.3, "gust_mph": 8.3, "humidity": 82, "is_day": 1, "last_updated": "2024-02-03 10:15", "last_updated_epoch": 1706951700, "precip_in": 0, "precip_mm": 0, "pressure_in": 30.39, "pressure_mb": 1029, "temp_c": 13, "temp_f": 55.4, "uv": 4, "vis_km": 10, "vis_miles": 6, "wind_degree": 360, "wind_dir": "N", "wind_kph": 6.1, "wind_mph": 3.8}, "forecast": {"forecastday": [[Object], [Object], [Object]]}, "location": {"country": "Italie", "lat": 43.82, "localtime": "2024-02-03 10:22", "localtime_epoch": 1706952165, "lon": 7.77, "name": "Sanremo", "region": "Liguria", "tz_id": "Europe/Rome"}};
//     const fetchForcast = jest.fn().mockResolvedValue(mockForecastData);
//     const setMyForcast = jest.fn();
//     const setIsLoading = jest.fn();
//     const setPosition = jest.fn();
//     const toogleSearch = jest.fn();

//     // Render the HomeScreen component
//     const { getByText } = render(
//       <HomeScreen
//         fetchForcast={fetchForcast}
//         setMyForcast={setMyForcast}
//         setIsLoading={setIsLoading}
//         setPosition={setPosition}
//         toogleSearch={toogleSearch}
//       />
//     );

//     // Trigger the handleLocation function
//     // first press search button/icon
//     // a droppdown menu should appear, and we need to click the first element
//     // handleLocation({ name: "Sanremo" });
    

//     // Wait for the fetchForcast function to be called and resolve
//     await waitFor(() => expect(fetchForcast).toHaveBeenCalledWith({
//       cityLocation: mockLocation.name,
//       days: '3',
//     }));

//     // Expect the state to be updated accordingly
//     expect(setMyForcast).toHaveBeenCalledWith(mockForecastData);
//     expect(setIsLoading).toHaveBeenCalledWith(false);
//     expect(setPosition).toHaveBeenCalledWith([]);
//     expect(toogleSearch).toHaveBeenCalledWith(false);
//   });
// });

// describe('HomeScreen', () => {
//   test('handleLocation function should fetch forecast data and update state', async () => {
//     const mockLocation = {"country": "Italie", "id": 1286276, "lat": 43.82, "lon": 7.77, "name": "Sanremo", "region": "Liguria", "url": "sanremo-liguria-italie"};
//     const mockForecastData = {"current": {"cloud": 50, "condition": {"code": 1003, "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png", "text": "Partly cloudy"}, "feelslike_c": 13.2, "feelslike_f": 55.7, "gust_kph": 13.3, "gust_mph": 8.3, "humidity": 82, "is_day": 1, "last_updated": "2024-02-03 10:15", "last_updated_epoch": 1706951700, "precip_in": 0, "precip_mm": 0, "pressure_in": 30.39, "pressure_mb": 1029, "temp_c": 13, "temp_f": 55.4, "uv": 4, "vis_km": 10, "vis_miles": 6, "wind_degree": 360, "wind_dir": "N", "wind_kph": 6.1, "wind_mph": 3.8}, "forecast": {"forecastday": [[Object], [Object], [Object]]}, "location": {"country": "Italie", "lat": 43.82, "localtime": "2024-02-03 10:22", "localtime_epoch": 1706952165, "lon": 7.77, "name": "Sanremo", "region": "Liguria", "tz_id": "Europe/Rome"}};
//     const fetchForcast = jest.fn().mockResolvedValue(mockForecastData);
//     const setMyForcast = jest.fn();
//     const setIsLoading = jest.fn();
//     const setPosition = jest.fn();
//     const toogleSearch = jest.fn();
//     const fetchLocation = jest.fn().mockResolvedValue(mockLocation);

//     // Render the HomeScreen component
//     const { getByText } = render(
//       <HomeScreen
//         fetchForcast={fetchForcast}
//         setMyForcast={setMyForcast}
//         setIsLoading={setIsLoading}
//         setPosition={setPosition}
//         toogleSearch={toogleSearch}
//       />
//     );

//     // Trigger the handleLocation function
//     // first press search button/icon
//     // a droppdown menu should appear, and we need to click the first element
//     fireEvent.changeText(getByTestId('location-search-input'), 'Sanremo');
//     fireEvent.press(getByTestId('search-button'));

//     // Wait for the fetchLocation function to be called and resolve
//     await waitFor(() => expect(fetchLocation).toHaveBeenCalledWith({ cityLocation: 'Sanremo' }));

//     // Expect the state to be updated accordingly
//     expect(setPosition).toHaveBeenCalledWith(mockLocation);
//     expect(setIsLoading).toHaveBeenCalledWith(false);
//   });
// });