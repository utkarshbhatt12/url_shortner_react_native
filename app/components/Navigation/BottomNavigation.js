import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ButtonGroup, Text, Icon} from 'react-native-elements';

const style = StyleSheet.create({
  navBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  navButton: {
    padding: 20,
  },
  buttonGroup: {
    height: 60,
  },
  singleButtonText: {
    // color: '#fff',
  },
});

const historyViewButton = () => (
  <View style={style.singleButton}>
    <Icon name="history" />
    <Text style={style.singleButtonText}>History</Text>
  </View>
);
const homeViewButton = () => (
  <View>
    <Icon color="#fff" name="home" />
    <Text style={style.singleButtonText}>Home</Text>
  </View>
);

export default class BottomNavigation extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedIndex: 0,
    };

    this.updateIndex = this.updateIndex.bind(this);
  }

  updateIndex(selectedIndex) {
    console.log('selected', selectedIndex === 0 ? 'Home' : 'History');
    this.setState({selectedIndex});
  }

  render() {
    // const buttons = ['Home', 'History'];
    const buttons = [{element: homeViewButton}, {element: historyViewButton}];

    const {selectedIndex} = this.state;

    return (
      <ButtonGroup
        selectedIndex={selectedIndex}
        onPress={this.updateIndex}
        buttons={buttons}
        containerStyle={style.buttonGroup}
      />
    );
  }
}
