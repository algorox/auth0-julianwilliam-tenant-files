function (user, context, callback) {
  user.app_metadata = user.app_metadata || {};
  // You can add a Role based on what you want
  // In this case I check domain


var legitIdentity = -1;
var i;

  for (i = 0; i < user.identities.length; i++) {

    if (user.identities[i].connection === 'legitid'){
      legitIdentity = i;
    }
  }

  if (legitIdentity >= 1) {

  var addRolesToUser = function(user, cb) {
    if (user.identities[legitIdentity].profileData.type === 'employee') {
      cb(null, ['employee', true]);
    }

    if (user.identities[legitIdentity].profileData.type === 'customer') {
      cb(null, ['customer', false]);
    }
  };

  addRolesToUser(user, function(err, roles) {
    if (err) {
      callback(err);
    } else {
      user.app_metadata.type = roles[0];
      user.app_metadata.mfaRequired = roles[1];
      auth0.users.updateAppMetadata(user.user_id, user.app_metadata)
        .then(function(){
          context.idToken[configuration.JWLM_NAMESPACE + 'type'] = user.app_metadata.type;
          context.idToken[configuration.JWLM_NAMESPACE + 'mfaRequired'] = user.app_metadata.mfaRequired;
          callback(null, user, context);
        })
        .catch(function(err){
          callback(err);
        });
    }
  });

}

  if (legitIdentity === 0) {

  var addRolesToUser = function(user, cb) {
    if (user.type === 'employee') {
      cb(null, ['employee', true]);
    }

    if (user.type === 'customer') {
      cb(null, ['customer', false]);
    }
  };
  addRolesToUser(user, function(err, roles) {
    if (err) {
      callback(err);
    } else {
      user.app_metadata.type = roles[0];
      user.app_metadata.mfaRequired = roles[1];
      auth0.users.updateAppMetadata(user.user_id, user.app_metadata)
        .then(function(){
          context.idToken[configuration.JWLM_NAMESPACE + 'type'] = user.app_metadata.type;
          context.idToken[configuration.JWLM_NAMESPACE + 'mfaRequired'] = user.app_metadata.mfaRequired;
          callback(null, user, context);
        })
        .catch(function(err){
          callback(err);
        });
    }
  });
}
  else {
    callback(null, user, context);
  }
}
