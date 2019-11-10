import React, {Component} from 'react';
import {
  AppRegistry,
  Image,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import {Input, Button} from 'react-native-elements';
import UrlInputBox from './app/components/Cards/UrlInput';
import LinkHistory from './app/components/History/List';
import './app/Firebase/Firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
const firebase = require('firebase/app');
require('firebase/auth');

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: 200,
    height: 200,
  },
  headerImage: {
    height: Dimensions.get('window').height / 4,
  },
  urlBoxContainer: {
    marginTop: -50,
  },
  icon: {
    fontSize: 20,
    marginRight: 10,
  },
});

const loginStyle = StyleSheet.create({
  container: {
    backgroundColor: '#ffe0cf',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e3e3e3',
  },
  form: {
    width: Dimensions.get('screen').width * 0.7,
    marginBottom: 10,
  },
  inputIcon: {
    marginRight: 4,
  },
  input: {
    backgroundColor: 'white',
  },
});

const userIcon = <Icon style={style.icon} name="user" />;
const padlockIcon = <Icon style={style.icon} name="lock" />;
const envelopeIcon = <Icon style={style.icon} name="envelope-o" />;
const gearIcon = <Icon style={style.icon} name="gear" />;
export default class main extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      user: null,
      email: null,
      password: null,
      idToken: null,
    };
  }

  authObserver = async user => {
    // if (user && !this.state.user) {
    if (user) {
      const idToken = await user.getIdToken(true);

      if (idToken) {
        this.setState({user, idToken, isLoading: false});

        console.log('setting idToken');
      }

      return;
    }

    console.log('user logged out');
    this.setState({isLoading: false});
  };

  observerError = async err => {
    console.log('observerError:', err);
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(this.authObserver, this.observerError);
  };

  handleEmailChange = event => {
    this.setState({email: event.nativeEvent.text});
  };

  handlePasswordChange = event => {
    this.setState({password: event.nativeEvent.text});
  };

  startLoginFlow = async () => {
    try {
      console.log('startLoginFlow called');

      this.state.user = await firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password);

      this.setState(this.state);
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        Alert.alert('Wrong password');

        return;
      }

      if (error.code === 'auth/invalid-email') {
        Alert.alert('Invalid Email');

        return;
      }

      if (error.code === 'auth/user-not-found') {
        const newUser = await firebase
          .auth()
          .createUserWithEmailAndPassword(
            this.state.email,
            this.state.password,
          );

        console.log('newUser', newUser);

        this.validateInput();

        return;
      }

      console.log('Err', error.code);
    }
  };

  validateInput = async () => {
    console.log('button clicked');

    if (this.state.user) {
      return;
    }

    if (!this.state.email || this.state.email.trim() === '') {
      Alert.alert('Email is required');
      this.setState({email: ''});

      return;
    }

    if (!this.state.password || this.state.password.trim() === '') {
      Alert.alert('Password is required');

      return;
    }

    console.log('logging in');

    this.startLoginFlow();
  };

  render() {
    if (this.state.isLoading) {
      console.log('in loading...');
      return null;
    }

    if (!this.state.user) {
      return (
        <View style={loginStyle.container}>
          <Image style={style.logo} source={require('./app/assets/logo.png')} />
          <View style={loginStyle.form}>
            <Input
              leftIcon={envelopeIcon}
              style={loginStyle.input}
              onChange={this.handleEmailChange}
              placeholder="you@address.com"
            />
            <Input
              secureTextEntry
              leftIcon={padlockIcon}
              style={loginStyle.input}
              onChange={this.handlePasswordChange}
              placeholder="password"
            />
            <Button
              icon={userIcon}
              onPress={this.validateInput}
              style={loginStyle.button}
              title="Signin"
              type="outline"
            />
          </View>
        </View>
      );
    }

    return (
      <View style={style.container}>
        <ScrollView style={style.scrollView}>
          <Image
            style={style.headerImage}
            source={require('./app/assets/head.jpg')}
          />
          <View style={style.urlBoxContainer}>
            <UrlInputBox
              props={{
                user: this.state.user,
                idToken: this.state.idToken,
              }}
            />
          </View>
          <LinkHistory props={{user: this.state.user}} />
        </ScrollView>
      </View>
    );
  }
}

AppRegistry.registerComponent('main', () => main);
