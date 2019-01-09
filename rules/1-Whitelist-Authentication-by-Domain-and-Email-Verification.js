function (user, context, callback) {
    var whitelist = [configuration.DOMAIN]; //authorized domains
    var userHasAccess = whitelist.some(
      function (domain) {
        var emailSplit = user.email.split('@');
        return emailSplit[emailSplit.length - 1].toLowerCase() === domain;
      });

    if (userHasAccess && ((user.email_verified === true) || (user.email_verified === 1))) {
      return callback(null, user, context);
    }

    return callback(new UnauthorizedError('Access denied: Email domain not whitelisted and/or email not verified'));
}
