const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/auth/twitter', passport.authenticate('twitter'));
router.get('/auth/twitter/callback', passport.authenticate('twitter', {
  successRedirect: '/',
  failureRedirect: '/'
}));

router.use('/users', require('./users'));
router.use('/polls', require('./polls'));

router.get('/user', (req, res) => {
  if (req.user)
    res.status(200).json(req.user);
  else
    res.status(404).end('Not found');
});

router.post('/logout', (req, res) => {
  if (req.user) {
    req.logOut();
    res.status(200).end();
  }
  else
    res.status(400).end('Bad request');
});

module.exports = router;
