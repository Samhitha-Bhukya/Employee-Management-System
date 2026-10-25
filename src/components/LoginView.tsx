import React, { useState } from 'react';
import { UserSession } from '../types';
import { ShieldCheck, User, Lock, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

interface LoginViewProps {
  onLoginSuccess: (session: UserSession) => void;
  logoutMessage?: string | null;
}

export const LoginView: React.FC<LoginViewProps> = ({
  onLoginSuccess,
  logoutMessage
}) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const u = username.trim().toLowerCase();
    const p = password.trim();

    if (u === 'admin' && p === 'admin123') {
      onLoginSuccess({
        username: 'admin',
        role: 'ADMIN',
        name: 'Sarah Mitchell (Administrator)'
      });
    } else if (u === 'user' && p === 'user123') {
      onLoginSuccess({
        username: 'user',
        role: 'USER',
        name: 'Alex Johnson (Staff Member)'
      });
    } else {
      setErrorMessage('Bad credentials. Please check your username and password.');
    }
  };

  const handleSelectRole = (role: 'ADMIN' | 'USER') => {
    if (role === 'ADMIN') {
      setUsername('admin');
      setPassword('admin123');
    } else {
      setUsername('user');
      setPassword('user123');
    }
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-900 to-slate-950">
      
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center font-extrabold text-white text-2xl tracking-wider shadow-lg mx-auto mb-3">
          CT
        </div>
        <h2 className="text-2xl font-extrabold tracking-tight text-white">
          Codec Technologies
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Employee Management System &bull; Java Internship
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-8 shadow-2xl rounded-xl border border-slate-200">
          
          {/* Logout Alert */}
          {logoutMessage && (
            <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-3.5 py-2.5 rounded-md flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{logoutMessage}</span>
            </div>
          )}

          {/* Error Alert */}
          {errorMessage && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-800 text-xs px-3.5 py-2.5 rounded-md flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Corporate Username
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin or user"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <span>Sign In to EMS Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Credentials Panel */}
          <div className="mt-6 pt-5 border-t border-slate-200">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Select Testing Account:
            </span>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleSelectRole('ADMIN')}
                className={`p-2 rounded-md border text-left transition-all ${
                  username === 'admin'
                    ? 'border-red-400 bg-red-50 text-red-950 ring-1 ring-red-400'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">ADMIN Role</span>
                  <span className="text-[10px] font-bold bg-red-600 text-white px-1.5 py-0.2 rounded">FULL</span>
                </div>
                <div className="text-[11px] font-mono text-slate-500 mt-1">admin / admin123</div>
              </button>

              <button
                type="button"
                onClick={() => handleSelectRole('USER')}
                className={`p-2 rounded-md border text-left transition-all ${
                  username === 'user'
                    ? 'border-blue-400 bg-blue-50 text-blue-950 ring-1 ring-blue-400'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">USER Role</span>
                  <span className="text-[10px] font-bold bg-blue-600 text-white px-1.5 py-0.2 rounded">READ</span>
                </div>
                <div className="text-[11px] font-mono text-slate-500 mt-1">user / user123</div>
              </button>
            </div>

            <p className="mt-3 text-[11px] text-slate-400 leading-normal">
              Backed by Spring Security 6 InMemoryUserDetailsManager with BCrypt password hashing.
            </p>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-slate-500">
          Codec Technologies Enterprise Portal &bull; Java Internship Project
        </div>
      </div>
    </div>
  );
};
