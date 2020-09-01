import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
  return jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
    expiresIn: '2h',
  });
};

export { generateToken as default };
