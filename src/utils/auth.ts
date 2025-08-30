import jwt from 'jsonwebtoken';

export interface AuthTokenPayload {
  email: string;
  iat: number;
  exp: number;
}

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function generateJWT(email: string): string {
  const secret = process.env.JWT_SECRET || 'fallback-secret-key';
  return jwt.sign(
    { email },
    secret,
    { expiresIn: '24h' }
  );
}

export function verifyJWT(token: string): AuthTokenPayload | null {
  try {
    const secret = process.env.JWT_SECRET || 'fallback-secret-key';
    return jwt.verify(token, secret) as AuthTokenPayload;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  
  const token = localStorage.getItem('auth_token');
  if (!token) return false;
  
  const payload = verifyJWT(token);
  return payload !== null;
}

export function login(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token);
  }
}

export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
  }
}

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
}