function verify (email, callback) {

  var promise = require('native-or-bluebird');

  var connection = mysql({
    host: configuration.AWS_MYSQL_HOST,
    user: configuration.AWS_MYSQL_USERNAME,
    password: configuration.AWS_MYSQL_PW,
    database: configuration.AWS_MYSQL_DB_ONE
  });

  connection.connect();

  var query = "UPDATE users SET email_Verified = TRUE WHERE email_Verified = FALSE AND email = ? ";

  var queryPromise = new Promise(function(resolve, reject){

  connection.query(query, email, function (err, results) {
      if (err) return reject(err);
      if (results.length === 0) return reject(new Error('Email Address Not found'));
      callback(null, results.length > 0);
    });
  });

  queryPromise.then(function(results){
  callback(null, results);
  }).catch(function(err){
  callback(err);
  });

}
