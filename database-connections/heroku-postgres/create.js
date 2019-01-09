function create(user, callback) {
  //this example uses the "pg" library
  //more info here: https://github.com/brianc/node-postgres

  var conString = configuration.PG_URI + '?ssl=true';

  postgres(conString, function (err, client, done) {
    if (err) {
      console.log('could not connect to postgres db', err);
      return callback(err);
    }
    bcrypt.hash(user.password, 10, function (err, hashedPassword) {
      var query = "INSERT INTO users(password, email, email_verified, nickname) VALUES ($1, $2, $3, $4)";

      var insert = [hashedPassword, user.email, false, user.email.split("@")[0]];

      client.query(query, insert, function (err, result) {
        // NOTE: always call `done()` here to close
        // the connection to the database
        done();
        if (err) {
          console.log('error executing query', err);
          return callback(err);
        }
        if (result.rows.length === 0) {
          return callback();
        }
        callback(null);
      });
    });
  });
}



