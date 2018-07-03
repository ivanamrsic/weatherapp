import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Image} from 'react-native';

const CityListItem = props => (
    <View style={style.citySection}>
        <TouchableOpacity onPress = {props.onPress}>
            <View >
                <Text style={style.cityName}>{props.city.value}</Text>
            </View>
        </TouchableOpacity> 
        {
            props.isDetailsShowing ? 
            <View>
                <Text>{props.weatherReport.weather.map((weather,index) => 
                    <View key={index}>
                        <Text style={{ color: 'white'}}>{weather.main}</Text>
                        <Image
                            style={{width: 50, height: 50}}
                            source={{uri: 'https://openweathermap.org/img/w/'+ weather.icon +'.png'}}
                          
                            />
                    </View>)
                    }
                </Text>
            </View>
            : null
        }
        {
            props.isLoading ? 
            <View>
                <ActivityIndicator size="large" color="#000000" />
            </View>: null
        }
    </View>
);


 const style = StyleSheet.create({
    citySection: {
        backgroundColor: '#1b70f9', 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius: 5,
        padding: '10%',
        borderColor: 'white'
    },
    cityName: {
        fontWeight: 'bold',
        fontSize: 30,
        color: 'white',
    }
});

export default CityListItem