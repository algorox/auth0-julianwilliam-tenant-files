function (user, context, callback) {

  var spa = 'LZ73y9gNI4lPYPiScjOyS5syuMMO0muu';
  var spaTestRedirect = 'https://jwlm.com:3003/api/public/yoti/';
  var conditionalRedirectUri = 'http://jwlm.com:3000/signedin';

  function createToken(clientId, clientSecret, issuer, user) {
    var options = {
      expiresInMinutes: 5,
      audience: clientId,
      issuer: issuer
    };
    return jwt.sign(user, clientSecret, options);
  }
  
  if (context.protocol === 'oauth2-resource-owner' || context.protocol === 'oauth2-password' || context.protocal === 'oauth2-refresh-token')
  
  {
    return callback(null, user, context);
  }
    
  if (context.protocol !== "redirect-callback") {
  
    if(context.clientID === spa && context.request.query.redirect_uri === conditionalRedirectUri)
    {

      var token = createToken(
        configuration.PP_CLIENT_ID,
        configuration.PP_CLIENT_SECRET,
        configuration.PP_ISSUER, {
          sub: user.user_id,
          //email: user.email,
          //nickname: user.nickname
        }
      );

    context.redirect = {
          url: spaTestRedirect + '?token=' + token
          //url: "http://jwlm.com:3000/progressive-profiling?token=" + token
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