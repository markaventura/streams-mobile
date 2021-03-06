var React = require('react-native');

var api = require('../Utils/api');
var defaultStyle = require('../Styles/Default');
var moment = require('moment');

var Icon = require('react-native-vector-icons/Ionicons');

var {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  ListView,
  TabBarIOS
} = React;

const TOKEN_KEY     = '@StreamsMobileUser:token';
const USER_ID_KEY   = '@StreamsMobileUser:user_id';

var Home = React.createClass({
  goLogin: function(){
    this.props.navigator.push({
      component: Login,
      title: 'Login'
    });
  },

  getWorklogs: function(userId, token) {
    api.getWorklogs(userId, token)
      .then((jsonRes) => 
        {
          jsonRes = jsonRes || {};
          var duration = moment.duration(jsonRes.seconds, 'seconds');
          this.setState({
            hour:       duration.get('hour'),
            minutes:    duration.get('minutes'),
            worklogs:   jsonRes.worklogs,
            dataSource: this.state.dataSource.cloneWithRows(jsonRes.worklogs),
            loaded:     true,
          });
        });
  },

  getWeeklyWorklogs: function(userId, token) {
    api.getWeeklyWorklogs(userId, token)
      .then((jsonRes) => 
        {
          jsonRes = jsonRes || {};

          var duration = moment.duration(jsonRes.seconds, 'seconds');
          var hours = parseInt(jsonRes.seconds / 3600);
          var minutes = (jsonRes.seconds % 3600) / 60
          this.setState({
            weeklyHour:       hours,
            weeklyMinutes:    minutes,
            weeklyWorklogs:   jsonRes.worklogs,
            weeklyDataSource:       this.state.dataSource.cloneWithRows(jsonRes.worklogs),
            weeklyLoaded:     true,
          });
        });
  },

  setToken: function(res) {
    this.setState({token: res[0][1], userId: res[1][1]});
  },

  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },

  componentDidMount() {
     this.props.showNavBar();
  },

  componentWillMount: function() {
    this.setState({hour: "0", minutes: "0", selectedTab: "dailyTab"});

    AsyncStorage.multiGet([TOKEN_KEY,USER_ID_KEY])
      .then((value) => {
        if (value !== null){
          this.setToken(value);
          this.getWorklogs(this.state.userId, this.state.token);
          this.getWeeklyWorklogs(this.state.userId, this.state.token);
        }
      })
      .catch((error) => this.setState({message: error.message}))
      .done();
  },

  _renderDailyContent(color: string, pageText: string, num?: number) {
    return (
      <View style={defaultStyle.mainContainer}>
        <View style={styles.topLog}>
          <View style={styles.hourContainer}>
            <Text style={styles.hour}>{this.state.hour}h</Text>
          </View>
          <View style={styles.minutesContainer}>
            <Text style={styles.minutes}>{this.state.minutes}m</Text>
          </View>
        </View>
        <View style={styles.bottomLog}>
          <ListView 
            automaticallyAdjustContentInsets={false}
            style={styles.listView}
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
          />
        </View>
      </View>
    )
  },

  _renderWeeklyContent(color: string, pageText: string, num?: number) {
    return (
      <View style={defaultStyle.mainContainer}>
        <View style={styles.topLog}>
          <View style={styles.hourContainer}>
            <Text style={styles.hour}>{this.state.weeklyHour}h</Text>
          </View>
          <View style={styles.minutesContainer}>
            <Text style={styles.minutes}>{this.state.weeklyMinutes}m</Text>
          </View>
        </View>
        <View style={styles.bottomLog}>
          <ListView 
            automaticallyAdjustContentInsets={false}
            style={styles.listView}
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
          />
        </View>
      </View>
    )
  },

  render: function(){
    var Image = React.Image;

    return (
      <TabBarIOS
        tintColor="white"
        barTintColor="#465664">
        <Icon.TabBarItem
          iconName="ios-list-outline"
          selectedIconName="ios-list-outline"
          selected={this.state.selectedTab === 'dailyTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'dailyTab',
            });
          }}>
          {this._renderDailyContent('#5FB2B7', 'Weekly Tab')}
        </Icon.TabBarItem>
        <Icon.TabBarItem
          iconName="plus-circled"
          selectedIconName="plus-circled"
          selected={this.state.selectedTab === 'addTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'addTab',
            });
          }}>
          {this._renderWeeklyContent('#5FB2B7', 'Add Tab')}
        </Icon.TabBarItem>
        <Icon.TabBarItem
          iconName="ios-calendar-outline"
          selectedIconName="ios-calendar-outline"
          selected={this.state.selectedTab === 'weeklyTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'weeklyTab',
            });
          }}>
          {this._renderWeeklyContent('#5FB2B7', 'Weekly Tab')}
        </Icon.TabBarItem>
      </TabBarIOS>
    )
  },

  _renderRow: function(worklog) {
    var _duration = moment.duration(worklog.duration, 'seconds');
    var _hour     = _duration.get('hour');
    var _minutes  = _duration.get('minute');

    return (
      <View style={styles.worklogContainer}>
        <View style={styles.projectStartTimeContainer}>
          <Text style={styles.startTime}>{moment(worklog.started_at).format('h:mm a')}</Text>
        </View>

        <View style={styles.projectNameContainer}>
          <Text style={styles.wlProjectName}>{worklog.project_name}</Text>
          <Text style={styles.wlProjectLog}>{worklog.message}</Text>
        </View>

        <View style={styles.projectTimeContainer}>
          <Text style={styles.timeNumber}>{_hour == "0" ? '' : _hour}</Text>
          <Text>{_hour == "0" ? '' : "h"}</Text>

          <Text style={styles.timeNumber}>{_minutes}</Text>
          <Text>min</Text>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  projectStartTimeContainer: {
    flex: 1,
    paddingLeft: 35
  },
  timeNumber: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#4A4A4A'
  },
  projectTimeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: 50,
    justifyContent: 'flex-end',
    paddingRight: 35
  },
  wlProjectLog: {
    color: '#4A4A4A'
  },
  wlProjectName: {
    fontSize: 15
  },
  projectNameContainer: {
    flex: 2,
    flexDirection: 'column',
    paddingLeft: 20,
    paddingRight: 20
  },
  startTime: {
    fontSize: 18,
    width: 80
  },
  topLog: {
    flex: 2,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50
  },
  bottomLog: {
    flex: 3,
    paddingTop: 10
  },
  hour: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#fff'
  },
  minutes: {
    fontSize: 18,
    color: '#727F55'
  },
  hourContainer: {
    borderRadius: 75, 
    backgroundColor: '#4A4A4A',
    height: 150,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center'
  },
  minutesContainer: {
    borderRadius: 30, 
    position: 'absolute',
    backgroundColor: '#B8E986',
    width: 60, 
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    top: 100,
    left: 210, 
    right: 0,
  },
  listView: {
    backgroundColor: '#F5FCFF',
  },
  worklogContainer: {
    flex: 3,
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 20,
    borderWidth: 1,
    borderBottomColor: '#CCC',
    borderColor: 'transparent'
  },
});

module.exports = Home;