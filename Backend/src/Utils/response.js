const sendError = (res, message = "Something went wrong", statusCode = 500) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};


// utils/response.js
const sendSuccess = (res, message = "Success",  statusCode = 200, data = {}) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export { sendSuccess, sendError };
