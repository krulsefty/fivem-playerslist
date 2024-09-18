import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Use environment variables
const SECRET_KEY = process.env.SECRET_KEY;

app.set('trust proxy', 1); // Trust the first proxy

// Middleware setup
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true, // Only for HTTPS, set to true in production
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
        sameSite: 'strict', // Prevents CSRF
        maxAge: 24 * 60 * 60 * 1000 // Optional: Set the session cookie expiry time (1 day in milliseconds)
    }
}));
app.use(express.static(path.join(__dirname, 'public')));

// Hardcoded credentials for demonstration
const hardcodedUser = {
    username: "pisklor",
    password: process.env.PASSWORD
};

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === hardcodedUser.username && password === hardcodedUser.password) {
        req.session.user = { username };
        req.session.save(err => { // Explicitly save session
            if (err) {
                console.error('Session save error:', err);
                return res.status(500).json({ success: false, message: 'Internal server error' });
            }
            res.json({ success: true });
        });
    } else {
        res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
});

// Middleware to check authentication
const authenticateSession = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).json({ success: false, message: 'Unauthorized' });
    }
};

// Serve login page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve protected content
app.get('/list', authenticateSession, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'list.html'));
});

// Check authentication status
app.get('/check-auth', (req, res) => {
    if (req.session.user) {
        res.sendStatus(200); // OK
    } else {
        res.sendStatus(401); // Unauthorized
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
