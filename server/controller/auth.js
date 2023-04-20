const userDatabase = require('../UserDatabase');
const jwt = require('jsonwebtoken');

const login = (req, res) => {
  const { email, password } = req.body;
  const [user] = userDatabase.filter((data) => data.email === email);

  if (!user) {
    res.status(401).json('Bad email');
  }

  if (user.password !== password) {
    res.status(401).json('Bad password');
  }

  try {
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, {
      expiresIn: '1m',
      issuer: 'Auth Pattern Server',
    });

    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET_KEY, {
      expiresIn: '24h',
      issuer: 'Auth Pattern Server',
    });

    res.status(200).json({
      user: payload,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json(error);
  }

  next();
};

const refreshToken = (req, res) => {
  try {
    const { refreshToken } = req.body;
    const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY);
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, {
      expiresIn: '1m',
      issuer: 'Auth Pattern Server',
    });

    res.status(200).json({
      user: payload,
      accessToken,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { login, refreshToken };
