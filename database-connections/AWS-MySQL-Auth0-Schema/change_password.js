function changePassword (email, newPassword, callback) {

  var promise = require('native-or-bluebird');

  var connection = mysql({
    host: configuration.AWS_MYSQL_HOST,
    user: configuration.AWS_MYSQL_USERNAME,
    password: configuration.AWS_MYSQL_PW,
    database: configuration.AWS_MYSQL_DB_ONE
  });

  connection.connect();
  //console.log('connection');

  var query = "UPDATE users SET password = ? WHERE email = ?";
  //console.log('query');
  var queryPromise = new Promise(function(resolve, reject){

  var saltRounds = 10;

  bcrypt.genSalt(saltRounds, function(err, salt) {
  //console.log('genSalt');

  bcrypt.hash(newPassword, salt, function (err, hash) {
    //console.log('hash');
    if (err) return reject(new Error('hashing error'));
    //console.log('hash ok');
      var insert = [
        hash,
        email
      ];

      connection.query(query, insert, function (err, results) {
        //console.log('pushing query');
        if (err) return reject(err);
        //console.log('success');
        resolve(results);
      });
  });
});
});

queryPromise.then(function(results){
callback(null, results);
}).catch(function(err){
callback(err);
});

}
