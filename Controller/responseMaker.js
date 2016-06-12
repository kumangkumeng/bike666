exports.StandardError = function (res, status, message)
{
  res.status(status);
  res.json({
    'status_code' : status,
    'message' : message,
    'data' : null
  });
}

exports.StandardSuccess = function (res, data, message)
{
  res.json({
    'status_code' : 200,
    'message' : message,
    'data' : data
  });
}
