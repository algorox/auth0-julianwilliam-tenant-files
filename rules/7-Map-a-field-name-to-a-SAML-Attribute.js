function (user, context, callback) {
  context.samlConfiguration.mappings = {
     "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": "email"
  };

  callback(null, user, context);
}
