import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useState, useEffect } from "react";
import { MagnifyingGlassCircleIcon } from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/outline";
import { debounce } from "lodash";
import { fetchForcast, fetchHourlyForcast, fetchLocation } from "../api/forcast";
import * as Location from "expo-location";
import MainBackgroundImage from "../components/background";
import PredictionTable from "../components/predictionTable";
import { generateData } from "../utils/predictionTableData";

const HourlyPredictions = () => {
  const [showSearch, toogleSearch] = useState(false);
  const [position, setPosition] = useState([]);
  const [Myforcast, setMyForcast] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [DATA, setDATA] = useState([]);

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
    fetchHourlyForcast({
      cityLocation: loc.name,
    }).then((data) => {
      setDATA(generateData(data));
      setIsLoading(false);
      console.log("the hourly forcast is ", data);
    });
  };
  
  const handleLocationSearch = (value) => {
    console.log("handleLocationSearch called. Location search: ", value);
    if (value.length > 2) {
      fetchLocation({ cityLocation: value })
      .then((data) => {
        setPosition(data);
        setIsLoading(false);
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
      const hourlyData = await fetchHourlyForcast({
        cityLocation: `${latitude},${longitude}`,
      });
      console.log("Hourly forcast data: ", hourlyData);
      setDATA(generateData(hourlyData));
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
          {/* Search bar */}
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