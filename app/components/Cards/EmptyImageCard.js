import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Image} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const style = StyleSheet.create({
  mainCard: {
    padding: 20,
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // borderColor: 'black',
    // borderWidth: 1,
  },
  childCard: {
    borderColor: 'red',
    borderWidth: 1,
  },
});

export default class EmptyImageCard extends React.Component {
  render() {
    return (
      <View style={style.mainCard}>
        <View style={style.childCard}>
          <Icon
            size={150}
            raised
            name="glass"
            type="font-awesome"
            color="#e3e3e3"
          />
        </View>
      </View>
    );
  }
}
