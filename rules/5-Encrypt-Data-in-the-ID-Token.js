function (user, context, callback) {
  context.idToken[configuration.JWLM_NAMESPACE + 'encrypted'] = encrypt({
    company: user.app_metadata.company,
    role: user.app_metadata.role
  });

  callback(null, user, context);

  function encrypt(data) {
    var iv = new Buffer(configuration.ENCRYPT_IV);
    var decodeKey = crypto.createHash('sha256')
      .update(configuration.ENCRYPT_PASSWORD, 'utf-8').digest();
    var cipher = crypto.createCipheriv('aes-256-cbc', decodeKey, iv);
    return cipher.update(JSON.stringify(data || {}), 'utf8', 'base64') + cipher.final('base64');
  }
}
