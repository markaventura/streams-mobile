var URL = 'http://streams2.sourcepad.com/'


//////////
// POST //
/////////
var api = {
  signIn(username, password){
    username = username.toLowerCase().trim();
    password = password.toLowerCase().trim();
    
    var PAGE_SIZE = 25;
    var PARAMS = '?user[email]=' + username + '&user[password]=' + password;
    var API_URL = '/api/sign_in'
    var REQUEST_URL = URL + API_URL + PARAMS;

    return fetch(REQUEST_URL, {
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
  }
};

module.exports = api;