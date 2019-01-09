function (user, context, callback) {

  // run only for the specified clients
   if ((configuration.AUTH0_PLAYGROUND_CLIENTID !== context.clientID) || (configuration.NATIVE_APP_ID === context.clientID) || (configuration.AUTH0_OIDC_CONFIG === context.clientID)) {
    // uncomment the following if clause in case you want to request a second factor only from user's that have user_metadata.use_mfa === true
    // if (user.user_metadata && user.user_metadata.use_mfa){
      context.multifactor = {
        // required
        provider: 'guardian',

        // optional, defaults to true. Set to false to force Guardian authentication every time.
        // See https://auth0.com/docs/multifactor-authentication/custom#change-the-frequency-of-authentication-requests for details
        allowRememberBrowser: false
      };
    }

    if ((configuration.AUTH0_PLAYGROUND_CLIENTID === context.clientID) && (context.protocol !== 'redirect-callback')){
       context.redirect = {
         url: 'https://google.com?clientid=auth0playground'
       };
     }

      if ((configuration.NATIVE_APP_ID === context.clientID) && (context.protocol !== 'redirect-callback')){
       context.redirect = {
         url: 'https://google.com?clientid=nativemobileapp'
       };
     }

  if ((configuration.AUTH0_OIDC_CONFIG === context.clientID) && (context.protocol !== 'redirect-callback')){

     context.multifactor = {
        // required
        provider: 'guardian',

        // optional, defaults to true. Set to false to force Guardian authentication every time.
        // See https://auth0.com/docs/multifactor-authentication/custom#change-the-frequency-of-authentication-requests for details
        allowRememberBrowser: false
      };
  }
    /*
    context.redirect = {
         url: 'https://jwlm.eu.auth0.com/mf'
         //WILL RESULT IN UNAUTHORIZED ERROR
       };
     }

     if (context.protocol === 'redirect-callback'){
       //TODO: handle the result of the MFA step
       //
       return callback(null, user, context);
     }
     */
/*
    if ('LZ73y9gNI4lPYPiScjOyS5syuMMO0muu' !== context.clientID) {
     // uncomment the following if clause in case you want to request a second factor only from user's that have user_metadata.use_mfa === true
     // if (user.user_metadata && user.user_metadata.use_mfa){
       context.multifactor = {
         // required
         provider: 'guardian',

         // optional, defaults to true. Set to false to force Guardian authentication every time.
         // See https://auth0.com/docs/multifactor-authentication/custom#change-the-frequency-of-authentication-requests for details
         allowRememberBrowser: false
       };
     }
*/

  callback(null, user, context);
}
