var React = require('react-native');
var Login = require('./Login');

var Home = require('./Home');
var moment = require('moment');
var now = moment().format('LL');

const TOKEN_KEY = '@StreamsMobileUser:token';

var Icon = require('react-native-vector-icons/Ionicons');


var {
  View,
  Text,
  StyleSheet,
  AsyncStorage
} = React;

var styles = StyleSheet.create({
  
});

class Main extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      nextButtonIcon: null,
      backButtonIcon: null,
      requestLoaded: false
    };
  }

  navigateToHome(){
    this.props.navigator.push({
      component: Home,
      title: now,
      rightButtonIcon: this.state.nextButtonIcon,
      leftButtonIcon: this.state.backButtonIcon,
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

  initButtons() {
    Icon.getImageSource('navicon', 30, 'red')
      .then((source) => {
        this.setState({ backButtonIcon: source });
    }).done();
  }

  initSecondButton() {
    Icon.getImageSource('ios-settings', 30, 'red')
      .then((source) => {
        this.setState({ nextButtonIcon: source });
    }).done();
  }

  componentWillMount(){
    this.initButtons();
  }

  navigateToInitialView() {
    AsyncStorage.getItem(TOKEN_KEY)
      .then((value) => {
        if (value !== null){
          this.navigateToHome();
        } else {
          this.navigateToLogin();
        }
      })
      .catch((error) => this.setState({message: error.message}))
      .done();
  }

  componentDidUpdate() {
    if(this.state.backButtonIcon && this.state.nextButtonIcon == null){
      this.initSecondButton();
    }

    if(this.state.backButtonIcon && this.state.nextButtonIcon) {
      this.navigateToInitialView();
    }
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