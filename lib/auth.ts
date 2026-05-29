'use client';

import { api } from './api';

export interface AuthUser {
  id: number;
  email: string;
  name: string;
  grade: string;
  avatar_url: string | null;
  created_at: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

const TOKEN_KEY = 'nebians_auth_token';
const USER_KEY = 'nebians_auth_user';

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getStoredUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setStoredUser(user: AuthUser): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const data = await api.post<AuthResponse>('/auth/login/', { email, password });
  setToken(data.token);
  setStoredUser(data.user);
  return data;
}

export async function register(formData: {
  email: string;
  password: string;
  password2: string;
  name: string;
  grade: string;
}): Promise<AuthResponse> {
  const data = await api.post<AuthResponse>('/auth/register/', formData);
  setToken(data.token);
  setStoredUser(data.user);
  return data;
}

export async function fetchProfile(): Promise<AuthUser> {
  const user = await api.get<AuthUser>('/auth/profile/');
  setStoredUser(user);
  return user;
}

export function logout(): void {
  removeToken();
}