/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Main = require('./App/Components/Main');
var Login = require('./App/Components/Login');
var moment = require('moment');

var TOKEN_KEY = '@StreamsMobileUser:token';

var {
  AppRegistry,
  StyleSheet,
  NavigatorIOS
} = React;

var StreamsMobile = React.createClass({

  getInitialState() {
    return {
      navigationBarHidden: true
    };
  },

  hideNavBar() {
    this.setState({
      navigationBarHidden: true
    });
  },

  showNavBar() {
    this.setState({
      navigationBarHidden: false
    });
  },

  render: function() {

    var nextScreen = Main;

    return (
      <NavigatorIOS
        titleTextColor='#fff'
        tintColor='#fff'
        barTintColor='#5FB2B7'
        style={styles.container}
        navigationBarHidden={this.state.navigationBarHidden}
        initialRoute={{
          title: 'Github Note Taker',
          component: nextScreen,
          passProps: {
            hideNavBar: this.hideNavBar,
            showNavBar: this.showNavBar,
          }
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
