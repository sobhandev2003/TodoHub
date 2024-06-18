const jwt = require('jsonwebtoken')
const validateAuthToken = (req, res, next) => {
    const token = req.cookies?.jwtToken;
    if (!token) {
        return res.status(401).send('Access denied. No token provided');
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid token');
    }
}


module.exports = { validateAuthToken }