function (user, context, callback) {
  var _ = require("lodash");

  var req = context.request;

  var scopes = (req.query && req.query.scope) || (req.body && req.body.scope);

  scopes = (scopes && scopes.split(" "));

  context.accessToken.scope = restrictScopes(user, scopes);

  callback(null, user, context);

  function restrictScopes(user, requested) {
    var adminScopes = ["openid", "profile", "email", "read:current_user", "update:current_user_metadata", "read:user", "write:user"];
    var userScopes = ["openid", "profile", "email", "read:current_user", "update:current_user_metadata"];

    var allowed;

    if (user.app_metadata.roles === 'admin') {
      allowed = adminScopes;
      return _.intersection(allowed, requested);
    }

    else  if (user.app_metadata.roles === 'user') {
      allowed = userScopes;
      return _.intersection(allowed, requested);
    }
  }
}
