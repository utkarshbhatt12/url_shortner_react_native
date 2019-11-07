import React from 'react';
import {View, StyleSheet, Alert, Linking, Clipboard} from 'react-native';
import {Input, Text, Card, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const style = StyleSheet.create({
  mainCard: {},
  buttonStyle: {
    marginTop: 16,
  },
  iconStyle: {
    marginRight: 5,
  },
  inputStyle: {
    marginBottom: 10,
  },
  longUrlContainer: {
    paddingTop: 10,
  },
  resultUrlText: {
    paddingBottom: 10,
    flex: 1,
    borderColor: '#e3e3e3',
    borderWidth: 1,
    marginRight: 4,
    paddingLeft: 4,
    // lineHeight: 40,
  },
  urlContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  linkColor: {
    color: 'blue',
  },
});

const linkIcon = (
  <Icon style={style.iconStyle} name="code" color="#ffffff" size={18} />
);

const checkValidUrl = url => {
  const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

  return new RegExp(expression).test(url);
};

export default class UrlInputBox extends React.Component {
  constructor() {
    super();

    this.state = {
      inputUrl: null,
      shortUrl: null,
    };
  }

  buttonOnPress = async () => {
    console.log('buttonOnPress this.state', this.state);
    if (!checkValidUrl(this.state.inputUrl)) {
      Alert.alert(
        'Invalid URL',
        'Looks like you entered an invald url. Please check your link again.',
      );

      return false;
    }

    console.log('url is valid');

    try {
      const URL =
        'https://us-central1-contactform-1b262.cloudfunctions.net/shortner';

      const r = await fetch(URL, {
        method: 'POST',
        body: JSON.stringify({
          url: this.state.inputUrl,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const {originalUrl, shortId} = await r.json();

      this.setState({
        shortUrl: `https://00el6bf.site/${shortId}`,
      });

      console.log(`Original url => ${originalUrl}`);
      console.log(`Short url => https://00el6bf.site/${shortId}`);
    } catch (err) {
      Alert.alert('Oops. Something went wrong');
    }
  };

  inputOnChange = inputUrl => {
    this.setState({inputUrl});
  };

  handleUrlClick = () => {
    console.log('link clicked');

    Linking.openURL(this.state.shortUrl);
  };

  onCopyButtonPress = async () => {
    if (!this.state.shortUrl) {
      Alert.alert('Please create a url first');

      return;
    }

    console.log('copying', this.state.shortUrl);

    await Clipboard.setString(this.state.shortUrl);
    Alert.alert('URL copied to your clipboard');
  };

  render() {
    return (
      <View>
        <Card title="URL Shortner" style={style.mainCard}>
          <View>
            <View>
              <Text>Enter your url here to generate a short URL.</Text>

              <Input
                ref
                onChangeText={this.inputOnChange}
                style={style.inputStyle}
                placeholder="Enter your URL here"
                leftIcon={<Icon name="link" size={18} color="black" />}
              />
            </View>
            <Button
              onPress={this.buttonOnPress}
              icon={linkIcon}
              buttonStyle={style.buttonStyle}
              title="Shorten URL"
            />
          </View>
        </Card>

        <Card title="Your short URL">
          <View style={style.urlContainer}>
            <Text style={style.resultUrlText} selectable>
              {this.state.shortUrl}
            </Text>
            <Button onPress={this.onCopyButtonPress} title="Copy" />
          </View>
          <View style={style.longUrlContainer}>
            <Text style={style.linkStyle} onPress={this.handleUrlClick}>
              Original:
              <Text style={style.linkColor}>{this.state.inputUrl}</Text>
            </Text>
          </View>
        </Card>
      </View>
    );
  }
}
