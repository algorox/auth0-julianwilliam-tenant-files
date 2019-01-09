function create (user, callback) {

  var promise = require('native-or-bluebird');

  var connection = mysql({
    host: configuration.AWS_MYSQL_HOST,
    user: configuration.AWS_MYSQL_USERNAME,
    password: configuration.AWS_MYSQL_PW,
    database: configuration.AWS_MYSQL_DB_ONE,
  });

  connection.connect();
  //console.log('connection');

  var query = "INSERT INTO users SET ?";
  //console.log('query');

  var queryPromise = new Promise(function(resolve, reject){

    var  saltRounds = 10;

    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
          //console.log('pw', user.password);

                if (err) return reject(new Error('hashing error'));

                var insert = {
                  password: hash,
                  email: user.email,
                  email_Verified: false,
                  nickname: user.email.split("@")[0]
                };

                //console.log('connection.query', insert);

                connection.query(query, insert, function (err, results) {
                  if (err) {
                    return reject(err);
                  }
                  if (results.length === 0) {
                  return reject(new Error('results error'));
                  }
                  //console.log('success');
                  resolve(null);
                });
            // Store hash in your password DB.
        });
    });
  });

  queryPromise.then(function(results){
  callback(results);
  }).catch(function(err){
  callback(err);
  });

}
