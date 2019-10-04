/* eslint-disable no-unused-vars */

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Appnavigator from './components/Navigator/Appnavigator';

export default class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Appnavigator />
      </View>
    );
  }
}
