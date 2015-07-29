/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Main = require('./App/Components/Main');
var Login = require('./App/Components/Login');
var moment = require('moment');

var {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
} = React;

var StreamsMobile = React.createClass({
  render: function() {

    var nextScreen = Login;

    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Github Note Taker',
          component: nextScreen,
        }}/>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111'
  },
});

AppRegistry.registerComponent('StreamsMobile', () => StreamsMobile);
