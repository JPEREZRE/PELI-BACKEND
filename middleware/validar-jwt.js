const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ mensaje: 'Error no está autorizado'});
    }

    try {
        const payload = jwt.verify(token, '123456' );
        req.payload = payload;
        next();

    } catch(error) {
        console.log(error);
        return res.status(401).json({ mensaje: 'Error no está autorizado'})
    }
       
}

module.exports = {
    validarJWT
}