'use strict';

var React = require('react-native');
var {Icon, } = require('react-native-icons');

var {
  StyleSheet,
  TouchableHighlight,
  Image,
  View,
  Text,
} = React;

var styles = StyleSheet.create({
  backButton: {
    width: 10,
    height: 17,
    marginLeft: 10,
    marginTop: 3,
    marginRight: 10
  },
  github: {
    width: 70,
    height: 70,
    margin: 10
  },
  beer: {
    width: 70,
    height: 70,
    margin: 10
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

var BackButton = React.createClass({
  render() {
    return (
      <Text>geghe</Text>
    )
  }
}); 

module.exports = BackButton;