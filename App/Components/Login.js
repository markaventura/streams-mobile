var React = require('react-native');

var defaultStyle = require('../Styles/Default');
var moment = require('moment');
var api = require('../Utils/api');
var Home = require('./Home');
var now = moment().format('LL');

var TOKEN_KEY = '@StreamsMobileUser:token';
var USER_ID_KEY = '@StreamsMobileUser:user_id';

var {
  Image,
  View,
  Text,
  AsyncStorage,
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
  handleResponse(res) {
    if(res.authentication_token == undefined) {
      this.setState({message: message});
    }else{
      this.saveUser(res);
      this.navigateToHome();
    }
  }
  saveUser(user) {
    AsyncStorage.multiSet([[TOKEN_KEY, user.authentication_token], [USER_ID_KEY, user.id.toString()]])
      .then(()        => this.setState({message: 'Yeah!'}))
      .catch((error)  => this.setState({message: 'AsyncStorage error: ' + error.message}))
      .done();
  }
  goToHome() {
    this.setState({isLoading: true});
    api.signIn(this.state.username, this.state.password)
      .then((jsonRes) => 
        {
          jsonRes = jsonRes || {};
          this.handleResponse(jsonRes);
        });
  }
  navigateToHome(){
    this.props.navigator.push({
      component: Home,
      title: now
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
  componentWillMount() {
    AsyncStorage.getItem(TOKEN_KEY)
      .then((value) => {
        if (value !== null){
          this.navigateToHome()
        }
      })
      .catch((error) => this.setState({message: error.message}))
      .done();
  }
  render(){
    console.log("baduy");
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