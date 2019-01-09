function(ctx, callback) {
  var newProfile = {
    email: ctx.payload.email,
    password: ctx.payload.password,
    connection: ctx.payload.connection,
    user_metadata: ctx.payload.user_metadata,
    app_metadata: {
      department: ctx.payload.memberships && ctx.payload.memberships[0],
      ...ctx.payload.app_metadata
    }
  };

  if (!ctx.payload.memberships || ctx.payload.memberships.length === 0) {
    return callback(new Error('The user must be created within a department.'));
  }

  // Get the department from the current user's metadata.
  var currentDepartment = ctx.request.user.app_metadata && ctx.request.user.app_metadata.department;
  if (!currentDepartment || !currentDepartment.length) {
    return callback(new Error('The current user is not part of any department.'));
  }

  // If you're not in the IT department, you can only create users within your own department.
  // IT can create users in all departments.
  if (currentDepartment !== 'IT' && ctx.payload.memberships[0] !== currentDepartment) {
    return callback(new Error('You can only create users within your own department.'));
  }

  if (ctx.method === 'update') {
    // If updating, only set the fields we need to send
    Object.keys(newProfile).forEach(function(key) {
      if (newProfile[key] === ctx.request.originalUser[key]) delete newProfile[key];
    });
  }

  // This is the payload that will be sent to API v2. You have full control over how the user is created in API v2.
  return callback(null, newProfile);
}
