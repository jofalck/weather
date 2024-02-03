// background.js
import React from 'react';
import { Image } from 'react-native';

const MainBackgroundImage = () => (
  <Image
    blurRadius={60}
    source={require("../assets/background.jpg")}
    style={{ position: 'absolute', height: '100%', width: '100%' }}
    testID="background-image"
  />
);

export default MainBackgroundImage;