import React from 'react';
import { View, Text, Image, SectionList } from 'react-native';

const PredictionTable = ({ DATA }) => {
    return (
        <SectionList
        stickySectionHeadersEnabled={true}
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({item, index}) => (
          <View style={{ 
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            borderRadius: 1,
            backgroundColor: index % 2 === 0 ? "#F0F4F8" : "#FFFFFF", 
            padding: 12, 
            borderBottomWidth: 3, 
            borderColor: "#E1E4E8",
          }}>
            <Text style={{ flex: 1, textAlign: "center" }}>{item[0]}</Text>
            <Image
              source={{ uri: `https:${item[1]}` }}
              style={{ width: 25, height: 25 }}
            />
            <Text style={{ flex: 1, textAlign: "center" }}>{item[2]}</Text>
            <Text style={{ flex: 1, textAlign: "center" }}>{item[3]}</Text>
            <Text style={{ flex: 1, textAlign: "center" }}>{item[4]}</Text>
          </View>
        )}
        renderSectionHeader={({section: {title}}) => (
          <View>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              color: 'white',
              marginTop:20,
              padding: 10,
              textAlign: 'center',
              marginVertical: 0,
              backgroundColor: '#4D96FF', 
              padding: 16,
              marginTop: 0,
            }}
          >
            {title}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#7F9FDF", // Lighter shade of blue
              marginBottom: 2,
              paddingVertical: 10,
              }}
          >
              <Text style={{ flex: 1, textAlign: "center", color: "white", }}>Time</Text>
              <Text style={{ flex: 2, textAlign: "center", color: "white",  }}>Temp(°C)</Text>
              <Text style={{ flex: 1, textAlign: "center", color: "white", }}>Rain (mm)</Text>
              <Text style={{ flex: 1, textAlign: "center", color: "white", }}>Wind(kph)</Text>
            </View>
          </View>

        )}
      />
);
};

export default PredictionTable;