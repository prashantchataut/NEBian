'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  AtSign,
  Calendar,
  MapPin,
  ArrowRight,
  ArrowLeft,
  Check,
  GraduationCap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChipGroup } from '@/components/ui/chip-group';
import { Toggle } from '@/components/ui/toggle';
import { Select } from '@/components/ui/select';
import { StepIndicator } from '@/components/ui/step-indicator';
import {
  STREAMS,
  STREAM_LABELS,
  GRADE_REQUIRES_STREAM,
  getSubjectsForGrade,
  SUBJECT_LABELS,
  GRADES,
  GRADE_LABELS,
  GENDERS,
  GENDER_LABELS,
  NEPALI_PROVINCES,
  type Gender,
  type Grade,
  type Subject,
  type Stream,
  type ContentScope,
  type NepaliProvince,
} from '@/types';
import Link from 'next/link';
import { register } from '@/lib/auth';
import { ApiError } from '@/lib/api';

const STEPS = [
  { label: 'Account', icon: <Mail className="h-4 w-4" /> },
  { label: 'Profile', icon: <User className="h-4 w-4" /> },
  { label: 'Location', icon: <MapPin className="h-4 w-4" /> },
];

const DISTRICTS_BY_PROVINCE: Record<NepaliProvince, string[]> = {
  Koshi: ['Bhojpur', 'Dhankuta', 'Ilam', 'Jhapa', 'Khotang', 'Morang', 'Panchthar', 'Sankhuwasabha', 'Solukhumbu', 'Sunsari', 'Taplejung', 'Terhathum', 'Udayapur'],
  Madhesh: ['Bara', 'Dhanusha', 'Mahottari', 'Parsa', 'Saptari', 'Sarlahi', 'Siraha'],
  Bagmati: ['Baglung', 'Chitwan', 'Dhading', 'Dolakha', 'Kathmandu', 'Kavrepalanchok', 'Lalitpur', 'Makwanpur', 'Nuwakot', 'Ramechhap', 'Rasuwa', 'Sindhuli', 'Sindhupalchok'],
  Gandaki: ['Gorkha', 'Kaski', 'Lamjung', 'Manang', 'Mustang', 'Myagdi', 'Nawalparasi (East)', 'Parbat', 'Syangja', 'Tanahu'],
  Lumbini: ['Arghakhanchi', 'Banke', 'Bardiya', 'Dang', 'Gulmi', 'Kapilvastu', 'Parasi (West)', 'Palpa', 'Pyuthan', 'Rolpa', 'Rukum (East)', 'Rupandehi'],
  Karnali: ['Dailekh', 'Dolpa', 'Humla', 'Jajarkot', 'Jumla', 'Kalikot', 'Mugu', 'Rukum (West)', 'Salyan', 'Surkhet'],
  Sudurpashchim: ['Achham', 'Baitadi', 'Darchula', 'Doti', 'Kailali', 'Kanchanpur', 'Melamchi', 'Seti'],
};

export default function RegisterPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState('');
  const [usernameStatus, setUsernameStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState<Gender | null>(null);
  const [grade, setGrade] = useState<Grade | null>(null);
  const [stream, setStream] = useState<Stream | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const [province, setProvince] = useState<NepaliProvince | null>(null);
  const [district, setDistrict] = useState('');
  const [school, setSchool] = useState('');
  const [lockProfile, setLockProfile] = useState(false);
  const [contentScope, setContentScope] = useState<ContentScope>('MyGradeOnly');

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const showStream = grade ? GRADE_REQUIRES_STREAM[grade] : false;
  const availableSubjects = grade ? getSubjectsForGrade(grade, stream) : [];

  const validateStep = useCallback(
    (step: number): boolean => {
      const newErrors: Record<string, string> = {};

      if (step === 0) {
        if (!email.includes('@')) {
          newErrors.email = 'Enter a valid email address';
        }
        if (password.length < 8) {
          newErrors.password = 'Password must be at least 8 characters';
        }
        if (password !== confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
      } else if (step === 1) {
        if (username.length < 3) {
          newErrors.username = 'Username must be at least 3 characters';
        } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
          newErrors.username = 'Only letters, numbers, and underscores allowed';
        }
        if (!dateOfBirth) {
          newErrors.dateOfBirth = 'Date of birth is required';
        }
        if (!gender) {
          newErrors.gender = 'Select your gender';
        }
        if (!grade) {
          newErrors.grade = 'Select your class';
        }
        if (grade && GRADE_REQUIRES_STREAM[grade] && !stream) {
          newErrors.stream = 'Select your stream';
        }
        if (subjects.length === 0) {
          newErrors.subjects = 'Select at least one subject';
        }
      } else if (step === 2) {
        if (!province) {
          newErrors.province = 'Select your province';
        }
        if (!district) {
          newErrors.district = 'Select your district';
        }
        if (!school.trim()) {
          newErrors.school = 'Enter your school or college name';
        }
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    [email, password, confirmPassword, username, dateOfBirth, gender, grade, stream, subjects, province, district, school]
  );

  useEffect(() => {
    if (username.length < 3 || !/^[a-zA-Z0-9_]+$/.test(username)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- username availability check
      setUsernameStatus('idle');
      return;
    }

    setUsernameStatus('checking');
    const timeout = setTimeout(() => {
      const taken = ['admin', 'test', 'user', 'root'].includes(username.toLowerCase());
      setUsernameStatus(taken ? 'taken' : 'available');
    }, 500);

    return () => clearTimeout(timeout);
  }, [username]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset subjects when grade/stream changes
    setSubjects([]);
  }, [grade, stream]);

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCompletedSteps((prev) => [...new Set([...prev, currentStep])]);
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    if (!validateStep(2)) return;

    setIsLoading(true);
    try {
      await register({
        email,
        password,
        password2: confirmPassword,
        name: username,
        grade: grade || '',
      });
      router.push('/');
    } catch (err) {
      if (err instanceof ApiError) {
        const serverErrors: Record<string, string> = {};
        if (err.data && typeof err.data === 'object') {
          const data = err.data as Record<string, unknown>;
          if (data.email) serverErrors.form = String(data.email);
          else if (data.password) serverErrors.form = String(data.password);
          else if (data.non_field_errors) serverErrors.form = String(data.non_field_errors);
          else serverErrors.form = err.message || 'Registration failed. Please try again.';
        } else {
          serverErrors.form = err.message || 'Registration failed. Please try again.';
        }
        setErrors(serverErrors);
      } else {
        setErrors({ form: 'Unable to connect. Please check your internet connection.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const availableDistricts = province ? DISTRICTS_BY_PROVINCE[province] : [];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center">
        <h1 className="text-xl font-semibold text-on-surface tracking-tight">
          Complete Your Profile
        </h1>
        <p className="text-sm text-on-surface-variant mt-1">
          NEBians community requires username and basic info to provide relevant materials.
        </p>
      </div>

      <StepIndicator
        steps={STEPS}
        currentStep={currentStep}
        completedSteps={completedSteps}
        onStepClick={(step) => {
          if (completedSteps.includes(step) || step <= Math.max(...completedSteps, -1) + 1) {
            setCurrentStep(step);
          }
        }}
      />

      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          if (currentStep === STEPS.length - 1) {
            handleSubmit();
          } else {
            handleNext();
          }
        }}
      >
        {errors.form && (
          <div className="rounded-[var(--radius-sm)] bg-error-container px-3 py-2 text-sm text-on-error-container">
            {errors.form}
          </div>
        )}
        {currentStep === 0 && (
          <div className="space-y-4 animate-slide-up">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              iconLeft={<Mail className="h-4 w-4" />}
              error={errors.email}
              autoComplete="email"
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                iconLeft={<Lock className="h-4 w-4" />}
                error={errors.password}
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
              error={errors.confirmPassword}
              autoComplete="new-password"
            />
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-5 animate-slide-up">
            <div className="relative">
              <Input
                label="Choose Unique Username"
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                iconLeft={<AtSign className="h-4 w-4" />}
                iconRight={
                  usernameStatus === 'available' ? (
                    <span className="text-green-600">
                      <Check className="h-4 w-4" />
                    </span>
                  ) : usernameStatus === 'checking' ? (
                    <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  ) : undefined
                }
                error={errors.username || (usernameStatus === 'taken' ? 'Username is already taken' : undefined)}
              />
              {usernameStatus === 'available' && (
                <p className="text-xs text-green-600 mt-1">Username is available</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="dob" className="text-sm font-medium text-on-surface">
                Date of Birth
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">
                  <Calendar className="h-4 w-4" />
                </span>
                <input
                  id="dob"
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className={`w-full h-10 rounded-[var(--radius-sm)] border bg-surface-container-lowest pl-10 pr-3 text-sm text-on-surface transition-[border-color,box-shadow] duration-[var(--transition-fast)] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent hover:border-outline ${
                    errors.dateOfBirth ? 'border-error focus:ring-error' : 'border-outline-variant'
                  }`}
                />
              </div>
              {errors.dateOfBirth && (
                <p className="text-xs text-error">{errors.dateOfBirth}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-on-surface">Gender</label>
              <ChipGroup
                options={GENDERS.map((g) => ({ value: g, label: GENDER_LABELS[g] }))}
                value={gender || ''}
                onChange={(v) => setGender(v as Gender)}
              />
              {errors.gender && (
                <p className="text-xs text-error">{errors.gender}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-on-surface">Class</label>
              <ChipGroup
                options={GRADES.map((g) => ({ value: g, label: GRADE_LABELS[g] }))}
                value={grade || ''}
                onChange={(v) => {
                  setGrade(v as Grade);
                  setStream(null);
                }}
              />
              {errors.grade && (
                <p className="text-xs text-error">{errors.grade}</p>
              )}
            </div>

            {showStream && (
              <div className="flex flex-col gap-1.5 animate-slide-up">
                <label className="text-sm font-medium text-on-surface">Stream</label>
                <ChipGroup
                  options={STREAMS.map((s) => ({ value: s, label: STREAM_LABELS[s] }))}
                  value={stream || ''}
                  onChange={(v) => setStream(v as Stream)}
                />
                {errors.stream && (
                  <p className="text-xs text-error">{errors.stream}</p>
                )}
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-on-surface">Subjects of Interest</label>
              <ChipGroup
                options={availableSubjects.map((s) => ({ value: s, label: SUBJECT_LABELS[s] }))}
                value={subjects}
                onChange={(v) => setSubjects(v as Subject[])}
                variant="multi"
              />
              {errors.subjects && (
                <p className="text-xs text-error">{errors.subjects}</p>
              )}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-5 animate-slide-up">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-on-surface">Location</label>
              <Select
                label="Pradesh / Province"
                value={province || ''}
                onChange={(e) => {
                  setProvince(e.target.value as NepaliProvince);
                  setDistrict('');
                }}
                options={NEPALI_PROVINCES.map((p) => ({ value: p, label: p }))}
                placeholder="Select your province"
                iconLeft={<MapPin className="h-4 w-4" />}
                error={errors.province}
              />
            </div>

            <Select
              label="District"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              options={availableDistricts.map((d) => ({ value: d, label: d }))}
              placeholder={province ? 'Select your district' : 'Select province first'}
              disabled={!province}
              iconLeft={<MapPin className="h-4 w-4" />}
              error={errors.district}
            />

            <Input
              label="School / College Name"
              type="text"
              placeholder="Enter your school or college name"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              iconLeft={<GraduationCap className="h-4 w-4" />}
              error={errors.school}
            />

            <div className="rounded-[var(--radius-md)] bg-surface-container-low p-4 border border-outline-variant">
              <Toggle
                checked={lockProfile}
                onChange={setLockProfile}
                label="Lock Profile"
                description="Keep profile details private. Only your username will be visible on posts."
                id="lock-profile"
              />
            </div>

            <div className="rounded-[var(--radius-md)] bg-surface-container-low p-4 border border-outline-variant">
              <p className="text-sm font-medium text-on-surface mb-3">Content Scope</p>
              <p className="text-xs text-on-surface-variant mb-3">
                Choose whether to see resources for your grade only or all grades.
              </p>
              <ChipGroup
                options={[
                  { value: 'MyGradeOnly', label: 'My grade only' },
                  { value: 'All', label: 'All grades' },
                ]}
                value={contentScope}
                onChange={(v) => setContentScope(v as ContentScope)}
              />
            </div>
          </div>
        )}

        <div className="flex items-center gap-3 pt-2">
          {currentStep > 0 && (
            <Button
              type="button"
              variant="ghost"
              size="lg"
              onClick={handleBack}
              iconLeft={<ArrowLeft className="h-4 w-4" />}
            >
              Back
            </Button>
          )}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="flex-1"
            loading={isLoading}
            iconRight={
              currentStep === STEPS.length - 1 ? undefined : (
                <ArrowRight className="h-4 w-4" />
              )
            }
          >
            {currentStep === STEPS.length - 1 ? 'Register & Enter NEBians' : 'Continue'}
          </Button>
        </div>
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
        <Link href="/login" className="text-primary hover:text-on-primary-container font-medium transition-colors">
          Sign in
        </Link>
      </p>
    </div>
  );
}