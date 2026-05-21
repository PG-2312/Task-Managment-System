import { useState } from 'react';
import { Link } from 'react-router-dom';
import { EnvelopeIcon, KeyIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import { useLogin } from '../hooks/useAuth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const loginMutation = useLogin();

  const validate = () => {
    const errs = {};
    if (!email.trim()) {
      errs.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Enter a valid email.';
    }
    if (!password) {
      errs.password = 'Password is required.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validate()) return;
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel: Hero Graphics */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-950 via-surface-950 to-surface-900 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary-500 rounded-full blur-[128px]" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-700 rounded-full blur-[128px]" />
        </div>
        <div className="relative z-10 max-w-md">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-2xl shadow-primary-500/30 mb-8">
            <Squares2X2Icon className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4 leading-tight">
            Organize your work,<br />
            <span className="bg-gradient-to-r from-primary-400 to-primary-200 bg-clip-text text-transparent">
              ship faster.
            </span>
          </h1>
          <p className="text-surface-400 text-lg leading-relaxed">
            TaskFlow helps you manage projects, track tasks, and stay productive with a beautiful and secure task management workspace.
          </p>
        </div>
      </div>

      {/* Right Panel: Interactive Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-surface-950">
        <div className="w-full max-w-sm animate-fade-in">
          <div className="lg:hidden flex items-center gap-2.5 mb-10">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
              <Squares2X2Icon className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">TaskFlow</span>
          </div>

          <h2 className="text-2xl font-bold text-white mb-1">
            Welcome back
          </h2>
          <p className="text-surface-400 text-sm mb-8">
            Sign in to your account
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-surface-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <EnvelopeIcon className="w-4.5 h-4.5 text-surface-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  placeholder="you@example.com"
                  autoFocus
                  className={`w-full pl-11 pr-4 py-2.5 bg-surface-900 border rounded-lg text-sm text-surface-100 placeholder-surface-500 focus:outline-none focus:ring-2 transition-all ${
                    errors.email
                      ? 'border-red-500/50 focus:ring-red-500/50'
                      : 'border-surface-700 focus:ring-primary-500/50 focus:border-primary-500'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="login-password" className="block text-sm font-medium text-surface-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <KeyIcon className="w-4.5 h-4.5 text-surface-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  placeholder="••••••••"
                  className={`w-full pl-11 pr-4 py-2.5 bg-surface-900 border rounded-lg text-sm text-surface-100 placeholder-surface-500 focus:outline-none focus:ring-2 transition-all ${
                    errors.password
                      ? 'border-red-500/50 focus:ring-red-500/50'
                      : 'border-surface-700 focus:ring-primary-500/50 focus:border-primary-500'
                  }`}
                />
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-400">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loginMutation.isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-surface-400">
            Don&apos;t have an account?{' '}
            <Link
              to="/register"
              className="font-medium text-primary-400 hover:text-primary-300 transition-colors"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
