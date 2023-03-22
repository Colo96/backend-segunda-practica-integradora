const Router = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/src/public/html/login.html');
});

router.get('/register', (req, res) => {
    res.sendFile(process.cwd() + '/src/public/html/register.html');
});

router.get('/profile', (req, res) => {
    res.sendFile(process.cwd() + '/src/public/html/profile.html');
});

module.exports = router;
