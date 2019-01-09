function (user, context, callback) {

  user.app_metadata = user.app_metadata || {};

  var promise = require('native-or-bluebird');
  var bowser = require('bowser');

  /* function getBrowser() {
    var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=/\brv[ :]+(\d+)/g.exec(ua) || [];
        return {name:'IE',version:(tem[1]||'')};
        }
    if(M[1]==='Chrome'){
        tem=ua.match(/\bOPR|Edge\/(\d+)/)
        if(tem!=null)   {return {name:'Opera', version:tem[1]};}
        }
    M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
    return {
      name: M[0],
      version: M[1]
    };
 }

  user.app_metadata.browserType = getBrowser();

  console.log(user.app_metadata.browserType);

  auth0.users.updateAppMetadata(user.user_id, user.app_metadata)
    .then(function(){
      context.idToken[configuration.JWLM_NAMESPACE + 'type'] = user.app_metadata.type;
      context.idToken[configuration.JWLM_NAMESPACE + 'mfaRequired'] = user.app_metadata.mfaRequired;
      callback(null, user, context);
    })
    .catch(function(err){
      callback(err);
    });
    */

callback(null, user, context);

}
