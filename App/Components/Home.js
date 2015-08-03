var React = require('react-native');

var api = require('../Utils/api');
var defaultStyle = require('../Styles/Default');
var moment = require('moment');

var {
  View,
  Text,
  StyleSheet,
  AsyncStorage
} = React;

const TOKEN_KEY     = '@StreamsMobileUser:token';
const USER_ID_KEY   = '@StreamsMobileUser:user_id';

var styles = StyleSheet.create({
  topLog: {
    flex: 2,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50
  },
  bottomLog: {
    flex: 3,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10
  },
  hour: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#fff'
  },
  hourContainer: {
    borderRadius: 75, 
    backgroundColor: '#4A4A4A',
    width: 150, 
    height: 150,
    justifyContent: 'center',
    alignItems: 'center'
  },
  minutesContainer: {
    position: 'absolute',
    backgroundColor: '#4A4A4A',
    width: 150, 
    height: 150,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class Home extends React.Component{
  goLogin(){
    this.props.navigator.push({
      component: Login,
      title: 'Login'
    });
  }
  getWorklogs(userId, token) {
    api.getWorklogs(userId, token)
      .then((jsonRes) => 
        {
          jsonRes = jsonRes || {};
          var duration = moment.duration(jsonRes.seconds, 'seconds');
          this.setState({
            hour:     duration.get('hour'),
            minutes:  duration.get('minutes'),
            worklogs: jsonRes.worklogs
          });
        });
  }
  setToken(res) {
    this.setState({token: res[0][1], userId: res[1][1]});
  }
  componentWillMount() {
    this.setState({hour: "0"});
    this.setState({hour: "0"});

    AsyncStorage.multiGet([TOKEN_KEY,USER_ID_KEY])
      .then((value) => {
        if (value !== null){
          this.setToken(value);
          this.getWorklogs(this.state.userId, this.state.token);
        }
      })
      .catch((error) => this.setState({message: error.message}))
      .done();
  }
  render(){
    return (
      <View style={defaultStyle.mainContainer}>
        <View style={styles.topLog}>
          <View style={styles.hourContainer}>
            <Text style={styles.hour}>{this.state.hour}h</Text>
          </View>
          <View style={styles.minutesContainer}>
            <Text style={styles.hour}>{this.state.minutes}h</Text>
          </View>
        </View>
        <View style={styles.bottomLog}>
          <Text> Testing the Router </Text>
        </View>
      </View>
    )
  }
}

module.exports = Home;