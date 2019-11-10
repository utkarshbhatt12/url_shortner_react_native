import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View, StyleSheet, Dimensions, Alert} from 'react-native';
import {Input, Button, Image, Text} from 'react-native-elements';
import firebaseApp from '../../Firebase/Firebase';
const firebase = require('firebase/app');
require('firebase/auth');

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    borderWidth: 1,
    borderColor: '#e3e3e3',
  },
  form: {
    width: Dimensions.get('screen').width * 0.7,
    // height: 400,
    marginBottom: 10,
  },
  icon: {
    fontSize: 20,
    marginRight: 4,
  },
  button: {},
  input: {
    marginBottom: 10,
  },
});

const userIcon = <Icon style={style.icon} name="user" />;

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      user: null,
      email: null,
      password: null,
    };
  }

  handleEmailChange = event => {
    this.setState({email: event.nativeEvent.text});
  };

  handlePasswordChange = event => {
    this.setState({password: event.nativeEvent.text});
  };

  startLoginFlow = async () => {
    try {
      const ur = await firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password);

      console.log('ur', ur);
    } catch (error) {
      var errorCode = error.code;

      if (errorCode === 'auth/wrong-password') {
        Alert.alert('Wrong password');

        return;
      }

      if (errorCode === 'auth/user-not-found') {
        const newUser = await firebase
          .auth()
          .createUserWithEmailAndPassword(
            this.state.email,
            this.state.password,
          );

        console.log('newUser', newUser);

        this.validateInput();
      }

      console.log('Err', error);
    }
  };

  validateInput = async () => {
    console.log('button clicked');

    if (this.state.user) {
      return;
    }

    if (!this.state.email) {
      Alert.alert('Email is required');

      return;
    }

    if (!this.state.password) {
      Alert.alert('Password is required');

      return;
    }

    console.log('logging in');

    this.startLoginFlow();
  };

  render() {
    return <Text>124</Text>;
  }
}

export default Login;
