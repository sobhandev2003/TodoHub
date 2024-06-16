const jwt = require('jsonwebtoken')
const validateAuthToken = (req, res, next) => {
    const token = req.header('Cookie');
    console.log(req.cookies);
    if (!token) {
        // return res.status(401).send('Access denied. No token provided');
    }
    try {
        const tokenValue = token.split("=")[1]
        console.log(tokenValue);
        const verified = jwt.verify(tokenValue, process.env.JWT_SECRET_KEY);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid token');
    }
}


module.exports = { validateAuthToken }