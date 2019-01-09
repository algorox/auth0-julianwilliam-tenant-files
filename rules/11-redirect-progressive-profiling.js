function (user, context, callback) {

  function createToken(clientId, clientSecret, issuer, user) {
    var options = {
      expiresInMinutes: 5,
      audience: clientId,
      issuer: issuer
    };
    return jwt.sign(user, clientSecret, options);
  }
  
  var spa = 'LZ73y9gNI4lPYPiScjOyS5syuMMO0muu';
  var rwa = 'kYpArjbHlIccd4rjOzZZO7SjX1W1XwYs';
  var rwaTestRedirect = 'http://jwlm.com:3000/callback';
  var rwaProdRedirect = 'http://rwa.julianwilliam.com/callback'
  
  if (context.protocol === 'oauth2-resource-owner' || context.protocol === 'oauth2-password' || context.protocal === 'oauth2-refresh-token')
  
  {
    return callback(null, user, context);
  }
  
  else {
  
  //on Login always run this unless ROPG/PASSWORD/REFRESH
  if(context.protocol !== "redirect-callback") {
  
    //if(user.email === 'julian.test@auth0.com' && context.clientID === 'LZ73y9gNI4lPYPiScjOyS5syuMMO0muu' && context.request.query.prompt !== 'none')
    if(context.clientID === spa && context.request.query.prompt !== 'none' && context.connection !== 'jwlm-saml-idp')
    {
  
    var token = createToken(
          configuration.PP_CLIENT_ID,
          configuration.PP_CLIENT_SECRET,
          configuration.PP_ISSUER, {
            sub: user.user_id,
            email: user.email,
            nickname: user.nickname
          }
        );
  
    context.redirect = {
          url: "http://play.julianwilliam.com/progressive-profiling?token=" + token
          //url: "http://jwlm.com:3000/progressive-profiling?token=" + token
      };
      return callback(null, user, context);
    }
  
    if(context.clientID === rwa && context.request.query.redirect_uri === rwaTestRedirect)
    {
  
    var token = createToken(
          configuration.PP_CLIENT_ID,
          configuration.PP_CLIENT_SECRET,
          configuration.PP_ISSUER, {
            sub: user.user_id,
            email: user.email,
            nickname: user.nickname
          }
        );
  
    context.redirect = {
          url: "http://jwlm.com:3000/progressive_profile?token=" + token
      };
      return callback(null, user, context);
    }
  
    if(context.clientID === rwa && context.request.query.redirect_uri === rwaProdRedirect)
    {
  
    var token = createToken(
          configuration.PP_CLIENT_ID,
          configuration.PP_CLIENT_SECRET,
          configuration.PP_ISSUER, {
            sub: user.user_id,
            email: user.email,
            nickname: user.nickname
          }
        );
  
    context.redirect = {
          url: "http://rwa.julianwilliam.com/progressive_profile?token=" + token
      };
      return callback(null, user, context);
    }
  
    else
    {
      return callback(null, user, context);
    }
  }
  
  else
  {
    return callback(null, user, context);
  }
  
  }
  
  }