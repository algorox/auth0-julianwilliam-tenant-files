function (user, context, callback) {
   var namespace = configuration.JWLM_NAMESPACE;
   if (context.idToken && user.app_metadata) {
     context.idToken[namespace + 'app_metadata'] = user.app_metadata;
   }
   callback(null, user, context);
 }
