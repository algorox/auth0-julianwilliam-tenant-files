function (user, context, callback) {
  var ManagementClient = require('auth0@2.9.1').ManagementClient;
   
  var management = new ManagementClient({
  domain: 'jwlm.eu.auth0.com',
  clientId: configuration.mgmtAPIClient,
  clientSecret: configuration.mgmtAPISecret,
  scope: 'create:user_tickets'
  });
   
  
  
  var legacyROPGClient = 'CwcIxSVb5lE9Cmd64J6296HkjRUvyiZq';
  
  var conditionalRedirectUri = 'http://play.julianwilliam.com/pwreset';  

  //only Check for Redirect URI when it's a redirect pattern client
  if(context.clientID !== legacyROPGClient)
  {
    
  if((context.request.query.redirect_uri === conditionalRedirectUri) && (context.connection === 'sms') && (user.email_verified === true || user.email_verified === 1)){
  var params = {
  result_url: 'http://play.julianwilliam.com/logout', // You can also point this to the Auth0 Logout End-point with the client ID
  user_id: user.user_id,
  ttl_sec: 300
  };
   
  management.tickets.changePassword(params, function (err, url) {
  if (err) {
  console.log(err);
  }
   
  context.redirect = {
  url: url.ticket
  };
    return callback(null, user, context);
  });
   
  }
   
  if((context.request.query.redirect_uri === conditionalRedirectUri) && (context.connection === 'sms') && (user.identities.length === 1)){
  context.redirect = {
  url: 'http://play.julianwilliam.com/error?error=You_need_to_have_a_valid_account_to_use_this_service'
  };
   
    return callback(null, user, context);
  }
   
  else if (context.request.query.redirect_uri !== conditionalRedirectUri);
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