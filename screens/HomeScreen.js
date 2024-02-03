import {
    Image,
    SafeAreaView,
    ScrollView,
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
  import { CalendarDaysIcon } from "react-native-heroicons/solid";
  import { debounce } from "lodash";
  import { fetchForcast, fetchLocation } from "../api/forcast";
  import { forcastImgApi } from "../constVar/const";
  import * as Location from "expo-location";
  import MainBackgroundImage from "../components/background";
  
  const HomeScreen = () => {
    const [showSearch, toogleSearch] = useState(false);
    const [position, setPosition] = useState([]);
    const [Myforcast, setMyForcast] = useState({});
    const [isLoading, setIsLoading] = useState(true);
  
    const handleLocation = (loc) => {
      setIsLoading(true);
      console.log("Location:", loc);
      setPosition([]);
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
                      aria-label="search-input"
                      testID="search-input"
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
                          testID="call-handleLocation"
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
                {/* Celcius */}
                <View className="space-y-2">
                  <Text className="text-center font-bold text-white text-6xl ml-5">
                    {current?.temp_c}&#176;
                  </Text>
                  <Text className="text-center text-white text-xl tracking-widest">
                    {current?.condition?.text}
                  </Text>
                </View>
                {/* Small stats */}
                <View className="flex-row justify-between mx-0">
                  <View className="flex-row space-x-2 items-center">
                    <Image
                      source={require("../assets/statsIcons/uv.png")}
                      className="h-5 w-5"
                    />
                    <Text className="text-white font-semibold text-justify">
                      {current?.uv} UV
                    </Text>
  
                    <Image
                      source={require("../assets/statsIcons/drop.png")}
                      className="h-5 w-5"
                      
                    />
                    <Text className="text-white font-semibold text-justify">
                      {current?.humidity} %
                    </Text>
                    <Image
                      source={require("../assets/statsIcons/sunrise.png")}
                      className="h-5 w-5"
                    />
                    <Text className="text-white font-semibold text-justify">
                      {Myforcast?.forecast?.forecastday[0]?.astro?.sunrise}
                    </Text>
                    <Image
                      source={require("../assets/statsIcons/sunset.png")}
                      className="h-5 w-5"
                    />
                    <Text className="text-white font-semibold text-justify">
                      {Myforcast?.forecast?.forecastday[0]?.astro?.sunset}
                    </Text>
                  </View>
                </View>
              </View>
  
              {/* Forcast section */}
              <View className="mb-2 space-y-3">
                <View className="flew-row items-center mx-5 space-x-2">
                  <CalendarDaysIcon size={"22"} color={"white"} />
                  <Text className="text-white text-base">Daily Forcast</Text>
                </View>
                <ScrollView
                  horizontal
                  contentContainerStyle={{
                    paddingHorizontal: 35,
                    paddingBottom: 10,
                  }}
                  showsHorizontalScrollIndicator={false}
                >
                  {/* Forcast day */}
                  {Myforcast?.forecast?.forecastday?.map((item, index) => {
                    const forcastDates = new Date(item.date);
                    const options = { weekday: "long" };
                    let dayNameOfForcast = forcastDates.toLocaleDateString(
                      "en-US",
                      options
                    );
                    dayNameOfForcast = dayNameOfForcast.split(",")[0];
                    return (
                      <View
                        className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                        style={{ backgroundColor: "white", opacity: 0.9 }}
                        key={index}
                      >
                        <Image
                          source={forcastImgApi[item.day?.condition?.text]}
                          className="w-11 h-11"
                        />
                        <Text className="text-black">{dayNameOfForcast}</Text>
                        <Text className="text-black text-xl font-semibold">
                          {item.day?.avgtemp_c}&#176;
                        </Text>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            </SafeAreaView>
          </View>
        )}
      </View>
    );
  };
  
  export default HomeScreen;
  {
    /*  <Text className = 'text-red-500'>
              Email: {auth.currentUser?.email}
          </Text> */
  }