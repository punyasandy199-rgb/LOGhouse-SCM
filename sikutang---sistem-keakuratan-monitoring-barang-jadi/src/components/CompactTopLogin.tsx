/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UserAccount } from '../types';
import { CartoonWarehouseLogo } from './CartoonWarehouseLogo';
import { 
  LogIn, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  HelpCircle, 
  X, 
  Lock, 
  User, 
  KeyRound,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface CompactTopLoginProps {
  users: UserAccount[];
  onLoginSuccess: (user: UserAccount) => void;
  onForgotPasswordClick?: () => void;
}

export const CompactTopLogin: React.FC<CompactTopLoginProps> = ({
  users,
  onLoginSuccess
}) => {
  const [username, setUsername] = useState('admin.budi');
  const [password, setPassword] = useState('1234');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const cleanUsername = username.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanUsername) {
      setErrorMsg('Masukkan username akun.');
      return;
    }

    if (!cleanPassword) {
      setErrorMsg('Masukkan password / PIN.');
      return;
    }

    const foundUser = users.find(
      u => u.username.toLowerCase() === cleanUsername || 
           u.id.toLowerCase() === cleanUsername ||
           u.name.toLowerCase() === cleanUsername
    );

    if (!foundUser) {
      setErrorMsg(`Username "${username}" tidak terdaftar.`);
      return;
    }

    if (foundUser.pin !== cleanPassword) {
      setErrorMsg('Password salah! Cek daftar akun demo di bawah.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(foundUser);
    }, 200);
  };

  const handleQuickSelect = (u: UserAccount) => {
    setUsername(u.username);
    setPassword(u.pin);
    setErrorMsg(null);
  };

  return (
    <div className="bg-white border-b-2 border-slate-200 shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Left: Branding */}
          <div className="flex items-center gap-3.5 shrink-0">
            <CartoonWarehouseLogo size={42} variant="compact" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-slate-900 tracking-tight">
                  SIKUTANG
                </h1>
                <span className="bg-blue-100 text-blue-800 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                  WMS FGW
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Sistem Keakuratan Monitoring Barang Jadi
              </p>
            </div>
          </div>

          {/* Right: Small Compact Login Menu (Menu Login Kecil Bagian Depan Atas) */}
          <form 
            onSubmit={handleLogin}
            className="flex flex-wrap items-center gap-2.5 bg-slate-50 p-2 sm:p-2.5 rounded-2xl border border-slate-200 shadow-xs"
          >
            {/* Username Input */}
            <div className="relative flex-1 min-w-[130px] sm:min-w-[150px]">
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-3.5 h-3.5" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setErrorMsg(null);
                }}
                placeholder="Username"
                className="w-full pl-8 pr-2.5 py-1.5 text-xs font-semibold text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* Password Input */}
            <div className="relative flex-1 min-w-[120px] sm:min-w-[140px]">
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-3.5 h-3.5" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMsg(null);
                }}
                placeholder="Password"
                className="w-full pl-8 pr-7 py-1.5 text-xs font-semibold text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-2 flex items-center text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs px-4 py-1.5 rounded-lg shadow-xs hover:shadow transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shrink-0"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{isLoading ? 'Masuk...' : 'Login'}</span>
            </button>

            {/* Lupa Password Link */}
            <button
              type="button"
              onClick={() => setIsForgotModalOpen(true)}
              className="text-[11px] font-semibold text-slate-500 hover:text-blue-600 hover:underline px-1 py-1 cursor-pointer shrink-0"
            >
              Lupa password?
            </button>
          </form>

        </div>

        {/* Error notification if any */}
        {errorMsg && (
          <div className="mt-2 p-2 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-semibold flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

      </div>

      {/* Lupa Password Modal */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                <h3 className="font-black text-base text-slate-900">Bantuan Kata Sandi</h3>
              </div>
              <button
                onClick={() => setIsForgotModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Jika Anda lupa kata sandi akun gudang Anda, silakan hubungi <strong>Supervisor (SPV)</strong> atau <strong>Super Admin</strong> untuk mereset kata sandi Anda.
            </p>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs space-y-2">
              <div className="font-bold text-slate-900">Daftar Akun & PIN Default Demo:</div>
              <div className="space-y-1 font-mono text-[11px] text-slate-700">
                {users.map(u => (
                  <div key={u.id} className="flex justify-between items-center py-0.5 border-b border-slate-100 last:border-0">
                    <span>{u.username} ({u.role.toUpperCase()}):</span>
                    <strong className="text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {u.pin}
                    </strong>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsForgotModalOpen(false)}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition cursor-pointer"
            >
              Tutup & Kembali
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
