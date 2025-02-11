const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/whoop', passport.authenticate('withWhoop'));

router.get('/whoop/callback', 
    passport.authenticate('withWhoop', { failureRedirect: '/login' }),
    (req, res) => {
        res.json({ user: req.user, message: "Authentication successful!" });
    }
);

router.get('/profile', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    res.json(req.user);
});

module.exports = router;
