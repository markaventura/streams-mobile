const URL = 'http://streamsapp.co/'
const PAGE_SIZE = 25;

var moment = require('moment');
var moment = require('moment-timezone');
//////////
// POST //
/////////
var api = {
  signIn(username, password){
    username = username.toLowerCase().trim();
    password = password.toLowerCase().trim();
    
    var params = `?user[email]=${username}&user[password]=password`;
    var api_url = `/api/sign_in`
    var request_url = `${URL}${api_url}${params}`;

    return fetch(request_url, {
      method: 'POST',
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          'email': username,
          'password': password
        }
      })
    }).then((res) => res.json());
  },
  getWorklogs(user_id, token){
    var api_url = `/api/users/${user_id}/worklogs`;

    var start = moment.tz(moment().startOf('day'), "America/New_York").format();
    var end   = moment.tz(moment().endOf('day'), "America/New_York").format();

    var params = `start_date=${start}&end_date=${end}`;
    var request_url = `${URL}${api_url}?${params}`;

    return fetch(request_url, {
      method: 'GET',
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       'uid': user_id,
       'utoken': token
      }
    }).then((res) => res.json());
  },
  getProjects(user_id, token){
    var api_url = `/api/users/${user_id}/projects`;
    var request_url = `${URL}${api_url}`;

    return fetch(request_url, {
      method: 'GET',
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       'uid': user_id,
       'utoken': token
      }
    }).then((res) => res.json());
  }
};

module.exports = api;