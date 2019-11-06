import React from 'react';
import {View, Text, StyleSheet, Linking} from 'react-native';
import {Card, Button} from 'react-native-elements';

const style = StyleSheet.create({
  urlContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resultUrlText: {
    flex: 1,
    // padding: 20,
    lineHeight: 34,
    borderRadius: 2,
    borderWidth: 0.5,
    // padding: 5,
    marginRight: 5,
    paddingLeft: 5,
    fontSize: 16,
  },
  longUrlContainer: {
    flexDirection: 'column',
    marginTop: 15,
    marginRight: 5,
    // display: 'none',
  },
  linkStyle: {color: 'blue'},
});

export default class UrlDetailsBox extends React.Component {
  handleUrlClick(u) {
    console.log('link clicked', this);
    Linking.openURL(this.props.url);
  }
  constructor() {
    super();

    this.state = {
      url: '',
    };
  }

  render() {
    return (
      <Card title="Your short URL">
        <View style={style.urlContainer}>
          <Text style={style.resultUrlText} selectable>
            https://00el6bf.site/NKk77s
          </Text>
          <Button title="Copy" />
        </View>
        <View style={style.longUrlContainer}>
          <Text>Long URL:</Text>
          <Text style={style.linkStyle} onPress={this.handleUrlClick}>
            {this.state.url}
          </Text>
        </View>
      </Card>
    );
  }
}
