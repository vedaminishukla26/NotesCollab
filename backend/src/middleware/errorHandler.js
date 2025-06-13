const errorHandler = (err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({
        error: 'Server error',
        message: err.message,
      });
}

module.exports = errorHandler