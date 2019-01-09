function changePassword (email, newPassword, callback) {
  //this example uses the "pg" library
  //more info here: https://github.com/brianc/node-postgres

  var conString = configuration.PG_URI + '?ssl=true';
  postgres(conString, function (err, client, done) {
    if (err) {
      console.log('could not connect to postgres db', err);
      return callback(err);
    }

    bcrypt.hash(newPassword, 10, function (err, hash) {
      if (err) return callback(err);
      client.query('UPDATE users SET password = $1 WHERE email = $2', [hash, email], function (err, result) {
        // NOTE: always call `done()` here to close
        // the connection to the database
        done();

        if (err) {
          return callback(err);
        }

        if (result.rowCount === 0) {
          return callback();
        }

        callback(null, result.rowCount > 0);
      });
    });
  });
}

