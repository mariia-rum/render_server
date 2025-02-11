require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('./passportConfig');
 
const app = express();
app.use(express.json());
app.use(cors());
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


const authRoutes = require('./routes/authRoutes');
const whoopRoutes = require('./routes/whoopRoutes');

app.use('/auth', authRoutes);
app.use('/whoop', whoopRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
