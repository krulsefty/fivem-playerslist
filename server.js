import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Use environment variables
const SECRET_KEY = process.env.SECRET_KEY;

// Middleware setup
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true } // Set secure: true if using HTTPS
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
        req.session.user = { username }; // Store user in session
        res.json({ success: true });
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
