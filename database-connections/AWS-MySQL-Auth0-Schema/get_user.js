function getByEmail (email, callback) {

  var promise = require('native-or-bluebird');

  var connection = mysql({
    host: configuration.AWS_MYSQL_HOST,
    user: configuration.AWS_MYSQL_USERNAME,
    password: configuration.AWS_MYSQL_PW,
    database: configuration.AWS_MYSQL_DB_ONE
    });

    connection.connect();
    //console.log('connection');

    var query = "SELECT email FROM users WHERE email = ? ";

//console.log('query')
    var queryPromise = new Promise(function(resolve, reject){

      connection.query(query, email, function (err, results) {
        //console.log('connection query')
        //console.log(results);
        if (err) return reject(err);
        if (results.length <= 0) return reject(null);
        resolve({
          email: email
        });
      });
});

queryPromise.then(function(results){
callback(null, results);
}).catch(function(err){
callback(err);
});

}
