function login(email, password, callback) {

  var promise = require('native-or-bluebird');

  var connection = mysql({
    host: configuration.AWS_MYSQL_HOST,
    user: configuration.AWS_MYSQL_USERNAME,
    password: configuration.AWS_MYSQL_PW,
    database: configuration.AWS_MYSQL_DB_ONE
  });

  connection.connect();

  var query = "SELECT id, nickname, email, email_Verified, password " +
    "FROM users WHERE email = ?";

  var queryPromise = new Promise(function(resolve, reject){

  connection.query(query, [email], function (err, results) {

    if (err) return reject(new Error('Connection Error'));
    //console.log('results', results);

    if (!results) return reject(new WrongUsernameOrPasswordError(email));

    if (results.length === 0) return reject(new WrongUsernameOrPasswordError(email));

        var user = results[0];

      //console.log('pw', password);
      //console.log('user_pw', user.password);

      bcrypt.compare(password, user.password, function (err, isValid) {
          if (err) {
          reject(new Error('Login Error'));
          //console.log('error', err);
          }
          else if (!isValid) {
          //console.log('isValid', isValid);
          reject(new WrongUsernameOrPasswordError(email, 'Validation error'));
          }
          else {
          //console.log('success');
          resolve({
          id: 'aws_one_' + user.id.toString(),
          nickname: user.nickname,
          email: user.email,
          email_verified: user.email_Verified
          });
      }
      });
  });
  });

  queryPromise.then(function(profile){
  //console.log('success cb', profile);
  callback(null, profile);
  }).catch(function(err){
  //console.log('error cb', err);
  callback(err);
  });
}
