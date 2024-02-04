import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  SectionList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useState, useEffect } from "react";
import { MagnifyingGlassCircleIcon } from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/outline";
import { CalendarDaysIcon } from "react-native-heroicons/solid";
import { debounce } from "lodash";
import { fetchForcast, fetchLocation } from "../api/forcast";
import { forcastImgApi } from "../constVar/const";
import * as Location from "expo-location";
import MainBackgroundImage from "../components/background";

const apiExample = require('../constVar/forcast_example_responsebody.json');

// import DATA from '../constVar/forcast_example_responsebody.json';

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

console.log("DATA: ", DATA);


const HourlyPredictions = () => {
  const [showSearch, toogleSearch] = useState(false);
  const [position, setPosition] = useState([]);
  const [Myforcast, setMyForcast] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const handleLocation = (loc) => {
    console.log("handleLocation called");
    setIsLoading(true);
    console.log("Location:", loc);
    setPosition([]);
    setIsLoading(true);
    toogleSearch(false);
    fetchForcast({
      cityLocation: loc.name,
      days: "3",
    }).then((data) => {
      setMyForcast(data);
      setIsLoading(false);
      console.log("the forcast is ", data);
    });
  };
  
  const handleLocationSearch = (value) => {
    console.log("handleLocationSearch called. Location search: ", value);
    console.log("apiExample:", apiExample.forecast.forecastday);
    if (value.length > 2) {
      fetchLocation({ cityLocation: value })
      .then((data) => {
        setPosition(data);
        setIsLoading(false);
        /* console.log("Location data: ", data); */
      })
      .catch((error) => {
        console.error("Error fetching location: ", error);
      });
    }
  };
  
  const fetchCurrentLocationAndForcast = async () => {
    console.log("fetchCurrentLocationAndForcast called");
    try {
      setIsLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log("Location status: ", status);
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        setIsLoading(false);
        return;
      }

        let location;
        try {
          // console.log("Getting current location by calling Location.getCurrentPositionAsync({})")
          console.log("Gettig current location by calling Location.getLastKnownPositionAsync({})")
          location = await Location.getLastKnownPositionAsync({});
          if (location === null) {
            // Handle the case when the last known position is not available
            console.log("Last known position is not available");
            location = {
              coords: {
                latitude: 61,
                longitude: 11,
              },
            };
          }
        } catch (error) {
          console.error("Error getting current location: ", error);
        }
      console.log("Location: ", location);
      const { latitude, longitude } = location.coords;
      console.log("Latitude: ", latitude, "Longitude: ", longitude);
      const data = await fetchForcast({
        cityLocation: `${latitude},${longitude}`,
        days: "3",
      });
      console.log("Forcast data: ", data);
      setMyForcast(data);
    } catch (error) {
      console.error("Error during fetching data: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentLocationAndForcast();
  }, []);

  const debounceHandler = useCallback(debounce(handleLocationSearch, 1200), []);

  const { current, location } = Myforcast;

  return (
    <View className="flex-1 flex-row justify-center items-center">
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" /> // Customize as needed
      ) : (
        <View className="flex-1 relative">
          <StatusBar style="light" />
          <MainBackgroundImage />
          {/* Seacrh bar */}
          <SafeAreaView className="flex flex-1">
            <View
              className="relative z-50"
              style={{ paddingHorizontal: 20, marginTop: 20 }}
            >
              <View
                className="flex-row justify-end items-center rounded-full"
                style={{
                  backgroundColor: showSearch ? "white" : "transparent",
                  opacity: 0.9,
                }}
              >
                {showSearch && (
                  <TextInput
                    onChangeText={debounceHandler}
                    placeholder="Search Location"
                    placeholderTextColor={"lightgrey"}
                    className="pl-6 h-11 pb-1 flex-1 text-base text-black"
                  />
                )}

                <TouchableOpacity
                  onPress={() => toogleSearch(!showSearch)}
                  style={{ backgroundColor: "white" }}
                  className="rounded-full p-3 m-1"
                >
                  <MagnifyingGlassCircleIcon size={30} color={"black"} />
                </TouchableOpacity>
               
                <TouchableOpacity
                  onPress={fetchCurrentLocationAndForcast}
                  style={{ width: 55, backgroundColor: "#008080" }} // Set a specific width
                  className="rounded-full p-3 m-1 justify-center items-center" // Centering the icon
                  onPressIn={() => toogleSearch(false)}
                >
                  <MapPinIcon size={30} color={"white"} />
                </TouchableOpacity>
               
              </View>
              {position.length > 0 && showSearch ? (
                <View className="absolute w-full bg-gray-200 top-20 rounded-3xl mx-5">
                  {position.map((loc, index) => {
                    // Correctly returning a JSX element
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => handleLocation(loc)}
                        className="flex-row items-center border-0 p-3 pl-6 mb-1"
                      >
                        <MapPinIcon size={25} color={"black"} />
                        <View>
                          <Text className="text-black text-lg ml-2">
                            {loc?.name}, {loc?.country}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ) : null}
            </View>
            {/* Forcast section */}
            <View className="mx-4 flex justify-around flex-1 mb-2">
              {/* Location */}
              <Text className="text-white text-center text-3xl font-bold">
                {location?.name},
                <Text className="text-lg font-semibold text-gray-200">
                  {" " + location?.country}
                </Text>
              </Text>
              {/* Weather Image */}
              <View className="flex-row justify-center">
                <Image
                  source={forcastImgApi[current?.condition?.text]}
                  className="w-48 h-48"
                />
              </View>

              
              {/* Table with predictions */}
              <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={({item}) => (
                  <View >
                    <Text >{item}</Text>
                  </View>
                )}
                renderSectionHeader={({section: {title}}) => (
                  <Text 
                    style={{
                      fontWeight: 'bold',
                      fontSize: 20,
                    }}
                  >{title}</Text>
                )}
              />

              {/* Small stats */}

            </View>


          </SafeAreaView>
        </View>
      )}
    </View>
  );
};

export default HourlyPredictions;
{
  /*  <Text className = 'text-red-500'>
            Email: {auth.currentUser?.email}
        </Text> */
}