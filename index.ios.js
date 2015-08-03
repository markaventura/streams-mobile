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
        titleTextColor='#fff'
        tintColor='#fff'
        barTintColor='#5FB2B7'
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
    flex: 1
  },
});

AppRegistry.registerComponent('StreamsMobile', () => StreamsMobile);
