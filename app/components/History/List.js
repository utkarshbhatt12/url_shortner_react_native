import React from 'react';
import {View, StyleSheet, Linking} from 'react-native';
import {ListItem, Text, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const style = StyleSheet.create({
  historyTitle: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
  },
  historyButtonContainer: {
    padding: 20,
  },
  leftLinkIcon: {
    fontSize: 20,
  },
});

const rightIcon = <Icon name="angle-right" />;
const linkIcon = <Icon name="link" style={style.leftLinkIcon} />;

class HistoryList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadHistoryButtonVisible: true,
      links: [],
      user: props.props.user,
    };
  }

  loadhistory = async () => {
    console.log('loadhistory called');

    const url =
      'https://us-central1-contactform-1b262.cloudfunctions.net/history';

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${await this.state.user.getIdToken()}`,
        'Content-Type': 'Asia/Kolkata',
      },
    };

    console.log('options', options);

    const response = await (await fetch(url, options)).json();

    // console.log('response', response);

    const {links, message} = response;

    if (message) {
      console.log('Something went wrong');

      return;
    }

    this.setState({
      links,
      loadHistoryButtonVisible: false,
    });
  };

  onListLinkClick = link => {
    Linking.openURL(link);
  };

  render() {
    return (
      <View>
        <Text style={style.historyTitle}>Your previous links</Text>

        {this.state.loadHistoryButtonVisible && (
          <View style={style.historyButtonContainer}>
            <Button onPress={this.loadhistory} title="Load history" />
          </View>
        )}

        {this.state.links.map((li, index) => (
          <ListItem
            key={index}
            onPress={() =>
              this.onListLinkClick(`https://00el6bf.site/${li.shortId}`)
            }
            title={`https://00el6bf.site/${li.shortId}`}
            subtitle={li.originalUrl}
            leftIcon={linkIcon}
            badge={{
              value: li.hits,
              textStyle: {color: '#fff'},
            }}
            // rightTitle={new Date(li.createdAt).toDateString()}
            // rightTitleStyle={{fontSize: 10}}
            rightIcon={rightIcon}
            // rightSubtitle={new Date(li.createdAt).toDateString()}
            // rightSubtitleStyle
            bottomDivider
          />
        ))}
      </View>
    );
  }
}

export default HistoryList;
