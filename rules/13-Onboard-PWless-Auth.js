function (user, context, callback) {

  function createToken(clientId, clientSecret, issuer, user) {
    var options = {
      expiresInMinutes: 5,
      audience: clientId,
      issuer: issuer
    };
    return jwt.sign(user, clientSecret, options);
  }
  
  var legacyROPGClient = 'CwcIxSVb5lE9Cmd64J6296HkjRUvyiZq';

  //only Check for Redirect URI when it's a redirect pattern client
  if(context.clientID !== legacyROPGClient)
  {  
  
  //on Login always run this
  if(context.protocol !== "redirect-callback") {
  
    //if(user.email === 'julian.test@auth0.com' && context.clientID === 'LZ73y9gNI4lPYPiScjOyS5syuMMO0muu' && context.request.query.prompt !== 'none')
    if(user.identities.length === 1 && (user.email_verified === 1 || user.email_verified === true))
    {

    var token = createToken(
        configuration.PP_CLIENT_ID,
        configuration.PP_CLIENT_SECRET,
        configuration.PP_ISSUER, {
          sub: user.user_id
        }
      );

    var redirect_PWless = 'http://play.julianwilliam.com/passwordless_redirect/?pwlessStart=true&token=' + token;
      
    context.redirect = {
          url: redirect_PWless
      };
      return callback(null, user, context);
    }
  
    else
    {
      return callback(null, user, context);
    }
  }
  
  //on redirect back to Auth0, do this
    else
    {
      return callback(null, user, context);
    }
  }
    
    //if legacyROPG, do this
    else
    {
      return callback(null, user, context);
    }
  
  }