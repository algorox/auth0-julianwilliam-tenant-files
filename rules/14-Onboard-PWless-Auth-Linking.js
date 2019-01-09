function (user, context, callback) {

  var ManagementClient = require('auth0@2.9.1').ManagementClient;
   
  var management = new ManagementClient({
  domain: 'jwlm.eu.auth0.com',
  clientId: configuration.mgmtAPIClient,
  clientSecret: configuration.mgmtAPISecret,
  scope: 'update:users'
  });

  var jwtVerifierOptions = {
    audience: configuration.PP_CLIENT_ID,
    issuer: configuration.PP_ISSUER,
    algorithms: 'HS256'
  };
  
  var conditionalRedirectUri = 'http://play.julianwilliam.com/passwordless_redirect';
  var legacyROPGClient = 'CwcIxSVb5lE9Cmd64J6296HkjRUvyiZq';

  //only Check for Redirect URI when it's a redirect pattern client
  if(context.clientID !== legacyROPGClient)
  {
  if(context.request.query.redirect_uri === conditionalRedirectUri && context.request.query.login_hint !== null && user.identities.length === 1)
  {
    jwt.verify(context.request.query.login_hint, configuration.PP_SIGNING_KEY, jwtVerifierOptions, function(err, decoded) {
      
      if(err) {
      console.log(err);
      return callback(null, user, context);
      }
      
      else {
        
        var params = {
        
          user_id: user.user_id,
          provider: 'sms'
        };

        management.linkUsers(decoded.sub, params, function (err, url) {
          if (err) {
          console.log(err);
          return callback(null, user, context);
          }
          else { 
          return callback(null, user, context);
          }
          });
      }
      });
    }

    else {
      return callback(null, user, context);
    }

  }

  //if legacyROPG, do this  
  else
  {
    return callback(null, user, context);
  }
  }