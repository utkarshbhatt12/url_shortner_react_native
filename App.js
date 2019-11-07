import React, {Component} from 'react';
import {
  AppRegistry,
  Image,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import UrlInputBox from './app/components/Cards/UrlInputBox';
import Nav from './app/components/Navigation/BottomNavigation';
import UrlDetailsBox from './app/components/Cards/UrlDetailsBox';
import EmptyImageCard from './app/components/Cards/EmptyImageCard';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {},
  headerImage: {
    height: Dimensions.get('window').height / 4,
  },
  navBar: {},
  urlBoxContainer: {
    marginTop: -50,
  },
  urlDetails: {
    // display: 'none',
  },
});

export default class main extends Component {
  render() {
    return (
      <View style={style.container}>
        <ScrollView style={style.scrollView}>
          <Image
            style={style.headerImage}
            source={require('./app/assets/head.jpg')}
          />
          <View style={style.urlBoxContainer}>
            <UrlInputBox />
            {/* <UrlDetailsBox style={style.urlDetails} /> */}
            {/* <EmptyImageCard /> */}
          </View>
        </ScrollView>
        <Nav style={style.navBar} />
      </View>
    );
  }
}

AppRegistry.registerComponent('main', () => main);
