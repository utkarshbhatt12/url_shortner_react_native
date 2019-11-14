import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

class Spinner extends React.Component {
  render() {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
}

export default Spinner;
