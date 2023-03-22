const Router = require('express');
const authorization = require('../../middleware/auth.middleware');
const passportCustom = require('../../middleware/passportCustom.middleware');
const { generateToken } = require('../../utils/utils');
const BaseRouter = require('../base.router');

const router = Router();

const auhtMiddlewares = [
    passportCustom('jwt'),
    authorization('user')
];

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            error: 'Invalid email or password'
        });
    }
    const accessToken = generateToken({ email, role: 'user' });
    res.cookie('demo', accessToken, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true
    });
    res.json({
        payload: 'OK'
    });
});

router.post('/register', (req, res) => {
    const { firstname, lastname, age, email, password } = req.body;
    if (!firstname || !lastname || !age || !email || !password) {
        return res.status(400).json({
            error: 'Incomplete Registration'
        });
    }
    const accessToken = generateToken({ firstname, lastname, age, email, role: 'user' });
    res.cookie('demo', accessToken, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true
    });
    res.json({
        payload: 'OK'
    });
});

router.get('/current', auhtMiddlewares, async (req, res) => {
    res.json({
        payload: req.user
    });
});


module.exports = router;


