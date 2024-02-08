import React from 'react';
import { View, Text, Image, SectionList } from 'react-native';

const PredictionTable = ({ DATA }) => {
    return (
        <SectionList
            stickySectionHeadersEnabled={true}
            sections={DATA}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item, index }) => (
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: index % 2 === 0 ? '#FAC5A2' : 'lightgray',
                        borderRadius: 20,
                        padding: 3,
                        opacity: 0.8,
                        margin: 1,
                    }}
                >
                    <Text style={{ flex: 1, textAlign: 'center' }}>{item[0]}</Text>
                    <Image
                        source={{ uri: `https:${item[1]}` }}
                        style={{ width: 25, height: 25 }}
                    />
                    <Text style={{ flex: 1, textAlign: 'center' }}>{item[2]}</Text>
                    <Text style={{ flex: 1, textAlign: 'center' }}>{item[3]}</Text>
                    <Text style={{ flex: 1, textAlign: 'center' }}>{item[4]}</Text>
                </View>
            )}
            renderSectionHeader={({ section: { title } }) => (
                <View>
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: 20,
                            backgroundColor: '#E7AA8C',
                            padding: 10,
                            borderRadius: 130,
                            color: 'white',
                            textAlign: 'center',
                            marginTop: 10,
                        }}
                    >
                        {title}
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: 'lightblue',
                            borderRadius: 30,
                        }}
                    >
                        <Text style={{ flex: 1, textAlign: 'center' }}>Time</Text>
                        <Text style={{ flex: 2, textAlign: 'center' }}>Temp(°C)</Text>
                        <Text style={{ flex: 1, textAlign: 'center' }}>Rain (mm)</Text>
                        <Text style={{ flex: 1, textAlign: 'center' }}>Wind(kph)</Text>
                    </View>
                </View>
            )}
        />
    );
};

export default PredictionTable;