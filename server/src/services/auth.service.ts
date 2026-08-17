import crypto from 'crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma.js';
import { AppError } from '../middlewares/error.js';

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
const ACCESS_TTL = process.env.ACCESS_TOKEN_TTL ?? '15m';
const REFRESH_TTL_DAYS = 7;

type RegisterInput = { email: string; password: string; pseudonyme: string };
type LoginInput = { email: string; password: string };

function signAccessToken(id: number, role: string) {
  return jwt.sign({ id, role }, ACCESS_SECRET, { expiresIn: ACCESS_TTL } as jwt.SignOptions);
}

async function issueRefreshToken(userId: number) {
  const jti = crypto.randomUUID();
  const token = jwt.sign({ id: userId, jti }, REFRESH_SECRET);
  const expiresAt = new Date(Date.now() + REFRESH_TTL_DAYS * 24 * 60 * 60 * 1000);
  await prisma.refreshToken.create({ data: { userId, token, expiresAt } });
  return token;
}

export async function register(input: RegisterInput) {
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) throw new AppError(409, 'EMAIL_TAKEN', 'Cet email est déjà utilisé.');

  const hashed = await bcrypt.hash(input.password, 10);
  const user = await prisma.user.create({
    data: { email: input.email, password: hashed, pseudonyme: input.pseudonyme },
  });

  const accessToken = signAccessToken(user.id, user.role);
  const refreshToken = await issueRefreshToken(user.id);

  return {
    user: { id: user.id, email: user.email, pseudonyme: user.pseudonyme, role: user.role },
    accessToken,
    refreshToken,
  };
}

export async function login(input: LoginInput) {
  const user = await prisma.user.findUnique({ where: { email: input.email } });
  if (!user) throw new AppError(401, 'INVALID_CREDENTIALS', 'Email ou mot de passe incorrect.');

  const valid = await bcrypt.compare(input.password, user.password);
  if (!valid) throw new AppError(401, 'INVALID_CREDENTIALS', 'Email ou mot de passe incorrect.');

  const accessToken = signAccessToken(user.id, user.role);
  const refreshToken = await issueRefreshToken(user.id);

  return {
    user: { id: user.id, email: user.email, pseudonyme: user.pseudonyme, role: user.role },
    accessToken,
    refreshToken,
  };
}

export async function refresh(token: string) {
  let payload: { id: number };
  try {
    payload = jwt.verify(token, REFRESH_SECRET) as { id: number };
  } catch {
    throw new AppError(401, 'INVALID_TOKEN', 'Refresh token invalide ou expiré.');
  }

  const stored = await prisma.refreshToken.findUnique({ where: { token } });
  if (!stored || stored.expiresAt < new Date()) {
    throw new AppError(401, 'INVALID_TOKEN', 'Refresh token invalide ou expiré.');
  }

  const user = await prisma.user.findUnique({ where: { id: payload.id } });
  if (!user) throw new AppError(401, 'INVALID_TOKEN', 'Utilisateur introuvable.');

  // Rotation : on invalide l'ancien et on en émet un nouveau
  await prisma.refreshToken.delete({ where: { token } });
  const accessToken = signAccessToken(user.id, user.role);
  const newRefreshToken = await issueRefreshToken(user.id);

  return { accessToken, refreshToken: newRefreshToken };
}

export async function logout(token: string) {
  await prisma.refreshToken.deleteMany({ where: { token } });
}

export async function getMe(userId: number) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true, email: true, pseudonyme: true, nomReel: true, avatarUrl: true,
      bio: true, role: true, profileVisibility: true, contactLevel: true, createdAt: true,
    },
  });
  if (!user) throw new AppError(404, 'NOT_FOUND', 'Utilisateur introuvable.');
  return user;
}