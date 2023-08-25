import jwt from 'jsonwebtoken';

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;

  const token = authorization && authorization.split(' ')[1];

  if (!token) return res.status(401).json({ err: 'No estás autenticado, el token ha expirado' });

  jwt.verify(token, process.env.SECRET_JWT, (err, user) => {
    if (err) {
      return res.status(401).json({ err: 'Acceso Denegado, El token ha expirado o es incorrecto' });
    } else {
      req.user = user;
      next();
    }
  });
};

export default validateToken;
