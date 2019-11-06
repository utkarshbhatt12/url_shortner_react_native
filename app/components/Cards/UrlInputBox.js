import React from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {Input, Text, Card, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
// const validUrl = require('valid-url');

const style = StyleSheet.create({
  mainCard: {
    // marginTop: -3000,
    // backgroundColor: 'red',
  },
  buttonStyle: {
    marginTop: 16,
  },
  iconStyle: {
    marginRight: 5,
  },
  inputStyle: {
    marginBottom: 10,
  },
});

const linkIcon = (
  <Icon style={style.iconStyle} name="code" color="#ffffff" size={18} />
);

// const isValidUrl = url => validUrl.isUri(url);

export default class UrlInputBox extends React.Component {
  render() {
    const inputChangeHandler = e => {
      const {text: input} = e.nativeEvent;

      console.log('Entered:', input);

      if (input === 'aaa') {
        Alert.alert('Hello there', 'nice work');
      }
    };

    return (
      <Card title="URL Shortner" style={style.mainCard}>
        <View>
          <View>
            <Text>Enter your url here to generate a short URL.</Text>

            <Input
              onChange={inputChangeHandler}
              style={style.inputStyle}
              placeholder="Enter your URL here"
              leftIcon={<Icon name="link" size={18} color="black" />}
            />
          </View>
          <Button
            icon={linkIcon}
            buttonStyle={style.buttonStyle}
            title="Shorten URL"
          />
        </View>
      </Card>
    );
  }
}
