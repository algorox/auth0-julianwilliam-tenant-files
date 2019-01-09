function(ctx, callback) {
  var currentDepartment = ctx.payload.user.app_metadata.department;
  if (!currentDepartment || !currentDepartment.length) {
    return callback(null, [ ]);
  }

  if (currentDepartment === 'IT') {
    return callback(null, [ 'IT', 'HR', 'Finance', 'Marketing' ]);
  }

  return callback(null, [ ctx.payload.user.app_metadata.department ]);
}
