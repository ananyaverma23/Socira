// This middleware catches requests to routes that don't exist
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// This middleware catches all errors passed by 'next(error)'
const errorHandler = (err, req, res, next) => {
  // Sometimes errors come with a 200 OK status, which is weird.
  // This line sets the status to 500 (Server Error) if it was 200.
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Handle specific Mongoose errors (like a bad ObjectId)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found';
  }

  // Send the error back as a JSON object
  res.status(statusCode).json({
    message: message,
    // We only show the error 'stack' if we are not in production
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };