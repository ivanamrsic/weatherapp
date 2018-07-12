import React, { Component } from 'react';
import { View, Button, TextInput, StyleSheet } from 'react-native';
import { autobind } from '../../node_modules/core-decorators';

class AddCity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cityInputText: '',
    };
  }

  @autobind
  onChangeText(cityInputText) {
    this.setState({
      cityInputText,
    });
  }

  render() {
    return (
      <View style={style.addCityView}>
        <TextInput
          style={style.cityInput}
          placeholder="Search..."
          onChangeText={this.onChangeText}
        />
        <Button title="+" color="white" />
      </View>
    );
  }
}

const style = StyleSheet.create({
  cityInput: {
    backgroundColor: '#1c3b6d',
    color: 'white',
    borderRadius: 5,
    height: 30,
    flex: 0.95,
  },
  addCityView: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: 30,
  },
});

export default AddCity;
