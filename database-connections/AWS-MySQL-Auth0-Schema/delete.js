function remove (id, callback) {

  var promise = require('native-or-bluebird');

  var connection = mysql({
    host: configuration.AWS_MYSQL_HOST,
    user: configuration.AWS_MYSQL_USERNAME,
    password: configuration.AWS_MYSQL_PW,
    database: configuration.AWS_MYSQL_DB_ONE
  });

  connection.connect();
  //console.log('connection');

  var splitID = id.split("|").pop();
//console.log('connect');
  var query = 'DELETE FROM users WHERE id = ?';

    var queryPromise = new Promise(function(resolve, reject){
    //console.log(splitID);
    //console.log('query');
      connection.query(query, [splitID], function (err) {
        //console.log('connection.query');
        if (err) return reject(err);
        //console.log('deleted');
        resolve(null);
      });
    });

queryPromise.then(function(results){
callback(null, results);
}).catch(function(err){
callback(err);
});
}
