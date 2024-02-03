
import React from 'react';
import SettingsScreen from './SettingsScreen';
import HourlyPredictions from './HourlyPredictions';
import { MaterialIcons } from '@expo/vector-icons';
import LoginScreen from './LoginScreen';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons'; 
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/core';
import { auth } from '../firebase'
import { Entypo } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {

  const navigation = useNavigation();

  const handleSignOut = () =>{
      auth.signOut().then(() => {
          navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

  return (
    <Tab.Navigator
    screenOptions={{headerShown: false}}
    >
      
      <Tab.Screen name="Home" component={HomeScreen} options={{
            tabBarIcon: ({focused})=>{
              return (
                <View
                 style={{
                  alignItems: "center",
                  justifyContent: "center",
                 }}
                >
                  <Entypo name="location" size={24} color={focused ? "purple" : "#008080"} />
                </View>
              )
            }
           }} />

      <Tab.Screen name="Hourly predictions" component={HourlyPredictions} options={{
        tabBarIcon: ({focused}) => {
          return(
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <AntDesign name="heart" size={24} color={focused ? "red" : "#008080"} />
          </View>
          )
        }
      }} />

<Tab.Screen name="Logout" component={LoginScreen} listeners={{
          tabPress: e => {
            // Prevent the default action
            e.preventDefault();
            
            // Call the sign out function
            handleSignOut();
          },
        }}
        options={{
        tabBarIcon: ({focused}) => {
          return(
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <AntDesign name="logout" size={24} color={focused ? "purple" : "red"} />
          </View>
          )
        }
      }} />
      
      {/* <Tab.Screen name="Settings" component={SettingsScreen} options={{
        tabBarIcon: ({focused}) => {
          return(
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name="settings" size={24} color="black" />
          </View>
          )
        }
      }} /> */}
      
    </Tab.Navigator>
  );
};

export default TabNavigator;