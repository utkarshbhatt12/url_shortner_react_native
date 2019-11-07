import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const style = StyleSheet.create({
  mainCard: {
    padding: 20,
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  childCard: {},
  icon: {
    fontSize: 250,
    color: '#e3e3e3',
  },
});

export default class EmptyImageCard extends React.Component {
  render() {
    return (
      <View style={style.mainCard}>
        <View style={style.childCard}>
          <Icon style={style.icon} raised name="compress" type="font-awesome" />
        </View>
        <Text>It appears that you have not created a URL yet.</Text>
      </View>
    );
  }
}
