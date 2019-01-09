function remove (id, callback) {
  // this example uses the "pg" library
  // more info here: https://github.com/brianc/node-postgres
  
  var conString = configuration.PG_URI + '?ssl=true';
  
  postgres(conString, function (err, client, done) {
    if (err) {
      console.log('could not connect to postgres db', err);
      return callback(err);
    }

    client.query('DELETE FROM users WHERE id = $1', [id], function (err) {
      // NOTE: always call `done()` here to close
      // the connection to the database
      done();

      if (err) {
        return callback(err);
      }

      callback(null);
    });
  });

}