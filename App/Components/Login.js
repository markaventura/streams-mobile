var React = require('react-native');

var defaultStyle = require('../Styles/Default');
var moment = require('moment');
var api = require('../Utils/api');
var Home = require('./Home');
var now = moment().format('MM');

var {
  Image,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'column'
  },
  halfHeight: {
    flex: 2,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50
  },
  inputs: {
    flex: 2,
    marginTop: 10,
    marginBottom: 10,
  },
  inputContainer: {
    padding: 10,
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    borderBottomColor: '#CCC',
    borderColor: 'transparent'
  },
  footer: {
    margin: 20
  }
});

class Login extends React.Component{
  goToHome() {
    this.setState({
      isLoading: true,
    });
    api.signIn(this.state.username, this.state.password)
      .then((jsonRes) => 
        {
          jsonRes = jsonRes || {};
          this.props.navigator.push({
            component: Home,
            title: now,
            passProps: {
              user: jsonRes
            }
          });
        });
  }
  handleUsernameChange(e){
    this.setState({
      username: e.nativeEvent.text
    })
  }
  handlePasswordChange(e){
    this.setState({
      password: e.nativeEvent.text
    })
  }
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.halfHeight}>
          <Image source={require('image!logo')} 
          style={styles.logo}/>
        </View>

        <View style={styles.inputs}>
          <View style={styles.inputContainer}>
            <Text>USERNAME</Text>
            <TextInput 
              onChange={this.handleUsernameChange.bind(this)}
              placeholder="johnd@sourcepad.com"  
              style={defaultStyle.textInput} />
          </View>

          <View style={styles.inputContainer}>
            <Text>PASSWORD</Text>
            <TextInput placeholder="johnd@sourcepad.com" 
              onChange={this.handlePasswordChange.bind(this)}
              password={true} 
              style={defaultStyle.textInput} />
          </View>

          <View style={styles.footer}>
            <TouchableHighlight
              onPress={this.goToHome.bind(this)}
              style={defaultStyle.btnSuccess}>
                <Text style={styles.buttonText}>Button!</Text>
            </TouchableHighlight> 
          </View>
        </View>

        <View style={styles.quarterHeight} />
      </View>
    )
  }
}

module.exports = Login;