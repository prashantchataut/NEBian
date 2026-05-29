'use client';

import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GRADES, GRADE_LABELS } from '@/types';
import Link from 'next/link';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [grade, setGrade] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const passwordsMatch = password === confirmPassword;
  const canSubmit = name.length >= 2 && email.includes('@') && password.length >= 8 && passwordsMatch;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-xl font-semibold text-on-surface">Create your account</h1>
        <p className="text-sm text-on-surface-variant mt-1">Start your learning journey with NEBians</p>
      </div>

      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); if (canSubmit) setIsLoading(true); }}>
        <Input
          label="Full name"
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          iconLeft={<User className="h-4 w-4" />}
          autoComplete="name"
        />

        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          iconLeft={<Mail className="h-4 w-4" />}
          autoComplete="email"
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-on-surface">Grade</label>
          <select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="h-10 rounded-[var(--radius-sm)] border border-outline-variant bg-surface-container-lowest px-3 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
          >
            <option value="">Select your grade</option>
            {GRADES.map(g => (
              <option key={g} value={g}>{GRADE_LABELS[g]}</option>
            ))}
          </select>
        </div>

        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            iconLeft={<Lock className="h-4 w-4" />}
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[34px] text-on-surface-variant hover:text-on-surface transition-colors"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>

        <Input
          label="Confirm password"
          type="password"
          placeholder="Re-enter your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          iconLeft={<Lock className="h-4 w-4" />}
          error={confirmPassword.length > 0 && !passwordsMatch ? 'Passwords do not match' : undefined}
          autoComplete="new-password"
        />

        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="terms"
            className="mt-1 h-4 w-4 rounded-[var(--radius-sm)] border-outline-variant text-primary focus:ring-primary"
          />
          <label htmlFor="terms" className="text-xs text-on-surface-variant">
            I agree to the Terms of Service and Privacy Policy
          </label>
        </div>

        <Button type="submit" variant="primary" size="lg" className="w-full" loading={isLoading} disabled={!canSubmit}>
          Create account
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-outline-variant" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-2 bg-surface text-on-surface-variant">or continue with</span>
        </div>
      </div>

      <Button variant="outline" size="lg" className="w-full">
        <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
        Sign up with Google
      </Button>

      <p className="text-center text-sm text-on-surface-variant">
        Already have an account?{' '}
        <Link href="/login" className="text-primary hover:text-primary-dark font-medium transition-colors">
          Sign in
        </Link>
      </p>
    </div>
  );
}