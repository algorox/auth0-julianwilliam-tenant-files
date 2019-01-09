function(ctx, callback) {
  // Get the department from the current user's metadata.
  var department = ctx.request.user.app_metadata && ctx.request.user.app_metadata.department;
  if (!department || !department.length) {
    return callback(new Error('The current user is not part of any department.'));
  }

  // The IT department can see all users.
  if (department === 'IT') {
    return callback();
  }

  // Return the lucene query.
  return callback(null, 'app_metadata.department:"' + department + '"');
}
