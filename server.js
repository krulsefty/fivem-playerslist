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

const SECRET_KEY = process.env.SECRET_KEY;
const hardcodedUser = {
    username: "pisklor",
    password: process.env.PASSWORD
};

app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}))
app.use(express.static(path.join(__dirname, 'public')))

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body

    if (username === hardcodedUser.username && password === hardcodedUser.password) {
        req.session.user = { username }
        res.json({ success: true })
    } else {
        res.status(401).json({ success: false, message: 'Niewłaściwe hasło lub nazwa użytkownika.' })
    }
})

const authenticateSession = (req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        res.status(401).json({ success: false, message: 'Unauthorized' })
    }
};

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

app.get('/list', authenticateSession, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'list.html'))
});

app.get('/check-auth', (req, res) => {
    if (req.session.user) {
        res.sendStatus(200)
    } else {
        res.sendStatus(401)
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
