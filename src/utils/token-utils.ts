import jwt from 'jsonwebtoken';

function generateResetToken(userId: string) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in .env');
  }
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
}
