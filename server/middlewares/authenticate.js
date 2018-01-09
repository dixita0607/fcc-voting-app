const authenticate = (req, res, next) => {
  if (req.user) next();
  else res.status(403).end('Forbidden');
};

module.exports = authenticate;
