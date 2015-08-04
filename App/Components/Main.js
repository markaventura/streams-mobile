var React = require('react-native');
var Login = require('./Login');

var Home = require('./Home');
var moment = require('moment');
var now = moment().format('LL');

const TOKEN_KEY = '@StreamsMobileUser:token';

var {
  View,
  Text,
  StyleSheet,
  AsyncStorage
} = React;

var styles = StyleSheet.create({
  
});

class Main extends React.Component{

  navigateToHome(){
    this.props.navigator.push({
      component: Home,
      title: now,
      passProps: {
        hideNavBar: this.props.hideNavBar,
        showNavBar: this.props.showNavBar,
      }
    });
  }

  navigateToLogin(){
    this.props.navigator.push({
      component: Login,
      title: now,
      passProps: {
        hideNavBar: this.props.hideNavBar,
        showNavBar: this.props.showNavBar,
      }
    });
  }

  componentWillMount() {
    this.setState({navigationBarHidden: false});

    AsyncStorage.getItem(TOKEN_KEY)
      .then((value) => {
        if (value !== null){
          this.navigateToHome()
        } else {
          this.navigateToLogin()
        }
      })
      .catch((error) => this.setState({message: error.message}))
      .done();
  }

  render(){
    return (
      <View style={styles.mainContainer}>
        <Text></Text>
      </View>
    )
  }
}

module.exports = Main;