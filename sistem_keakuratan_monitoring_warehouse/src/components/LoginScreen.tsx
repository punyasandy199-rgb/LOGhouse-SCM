/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UserAccount } from '../types';
import { CartoonWarehouseLogo } from './CartoonWarehouseLogo';
import { AlertCircle, Eye, EyeOff, ShieldCheck, HelpCircle, X } from 'lucide-react';

interface LoginScreenProps {
  users: UserAccount[];
  currentUser: UserAccount;
  onLoginSuccess: (user: UserAccount) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  users,
  currentUser,
  onLoginSuccess
}) => {
  const [usernameInput, setUsernameInput] = useState<string>(currentUser?.username || users[0]?.username || 'superadmin');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const cleanUsername = usernameInput.trim().toLowerCase();
    const cleanPassword = passwordInput.trim();

    if (!cleanUsername) {
      setErrorMsg('Silakan masukkan Username.');
      return;
    }

    if (!cleanPassword) {
      setErrorMsg('Silakan masukkan Password.');
      return;
    }

    // Match by username or id
    const foundUser = users.find(
      u => u.username.toLowerCase() === cleanUsername || u.id.toLowerCase() === cleanUsername
    );

    if (!foundUser) {
      setErrorMsg(`Username "${usernameInput}" tidak ditemukan!`);
      return;
    }

    if (foundUser.pin !== cleanPassword) {
      setErrorMsg('Password salah! Klik "Lupa password" jika membutuhkan bantuan.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(foundUser);
    }, 250);
  };

  const handleQuickSelectUser = (u: UserAccount) => {
    setUsernameInput(u.username);
    setPasswordInput(u.pin);
    setErrorMsg(null);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4 select-none relative overflow-hidden font-sans">
      {/* Background Subtle Ambience */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-sky-50 to-slate-200 pointer-events-none"></div>

      {/* Main Login Card - Exact Match with Image 1: Blue Rounded Container */}
      <div className="relative z-10 w-full max-w-[560px] bg-[#5B9BD5] border-2 border-[#4A8EC9] rounded-[48px] p-8 sm:p-10 shadow-2xl text-center space-y-6">
        
        {/* Circular Logo Badge */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full border-2 border-[#2b6cb0] bg-[#428bca]/30 flex flex-col items-center justify-center p-2 shadow-inner">
            <CartoonWarehouseLogo size={52} variant="compact" />
            <span className="text-[10px] font-black text-white tracking-widest uppercase mt-0.5">
              Logo
            </span>
          </div>
        </div>

        {/* Title Box: White Card with Black Outline */}
        <div className="bg-white border-2 border-slate-900 py-3.5 px-6 shadow-sm mx-auto max-w-md">
          <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-wider">
            SIKUTANG
          </h1>
          <p className="text-xs sm:text-sm font-bold text-slate-800 tracking-tight mt-0.5">
            Sistem Keakuratan Monitoring Barang Jadi
          </p>
        </div>

        {/* Form Fields: Two Column Rows matching Image 1 */}
        <form onSubmit={handleLogin} className="space-y-4 max-w-md mx-auto pt-2">
          
          {/* Row 1: Username Label (White) & Input (Orange) */}
          <div className="flex items-center gap-3">
            <div className="w-36 shrink-0 bg-white border-2 border-slate-900 px-3 py-2 text-center shadow-xs">
              <span className="text-xs sm:text-sm font-extrabold text-slate-900">
                Username :
              </span>
            </div>
            <div className="flex-1 relative">
              <input
                type="text"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="Username akun"
                className="w-full bg-[#ED7D31] border-2 border-[#c25e1a] text-white font-bold placeholder:text-orange-200 px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white shadow-xs"
              />
            </div>
          </div>

          {/* Row 2: Password Label (White) & Input (Orange) */}
          <div className="flex items-center gap-3">
            <div className="w-36 shrink-0 bg-white border-2 border-slate-900 px-3 py-2 text-center shadow-xs">
              <span className="text-xs sm:text-sm font-extrabold text-slate-900">
                Password :
              </span>
            </div>
            <div className="flex-1 relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Password / PIN"
                className="w-full bg-[#ED7D31] border-2 border-[#c25e1a] text-white font-bold placeholder:text-orange-200 px-3.5 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-white shadow-xs"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-orange-200 hover:text-white cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Row 3: Lupa Password Button on Right Side */}
          <div className="flex justify-end pt-0.5">
            <button
              type="button"
              onClick={() => setIsForgotModalOpen(true)}
              className="bg-white border-2 border-slate-900 px-4 py-1 text-xs font-bold text-slate-900 hover:bg-slate-100 active:bg-slate-200 shadow-xs transition cursor-pointer"
            >
              Lupa password
            </button>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-2.5 bg-rose-100 border-2 border-rose-600 text-rose-900 text-xs font-bold flex items-center justify-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Big Orange Login Button */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={isLoading}
              className="w-48 bg-[#ED7D31] hover:bg-[#d96c22] active:bg-[#c25e1a] border-2 border-[#c25e1a] text-white font-black text-base sm:text-lg py-2.5 px-6 shadow-md transition cursor-pointer disabled:opacity-50"
            >
              {isLoading ? 'Loading...' : 'Login'}
            </button>
          </div>
        </form>

        {/* Quick Accounts Preset Bar */}
        <div className="pt-4 border-t border-blue-400/40 max-w-md mx-auto">
          <span className="text-[11px] font-bold text-white block mb-1.5 opacity-90">
            Akses Cepat Pengguna Demo:
          </span>
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {users.map(u => (
              <button
                key={u.id}
                type="button"
                onClick={() => handleQuickSelectUser(u)}
                className="px-2.5 py-1 bg-white/20 hover:bg-white/30 text-white font-mono text-[10px] font-bold rounded border border-white/30 transition cursor-pointer"
              >
                {u.username} ({u.pin})
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Lupa Password Modal */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white border-2 border-slate-900 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                <h3 className="font-black text-base text-slate-900">Bantuan Lupa Password</h3>
              </div>
              <button
                onClick={() => setIsForgotModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Sesuai SOP Keamanan Sistem Gudang SIKUTANG, reset kata sandi hanya dapat dilakukan oleh <strong>Supervisor (SPV)</strong> atau <strong>Super Admin</strong>.
            </p>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs space-y-2">
              <div className="font-bold text-slate-900">Daftar Akun & PIN Default:</div>
              <div className="space-y-1 font-mono text-[11px] text-slate-700">
                <div className="flex justify-between">
                  <span>superadmin:</span>
                  <strong className="text-blue-700">1234</strong>
                </div>
                <div className="flex justify-between">
                  <span>supervisor:</span>
                  <strong className="text-blue-700">0000</strong>
                </div>
                <div className="flex justify-between">
                  <span>admin:</span>
                  <strong className="text-blue-700">1111</strong>
                </div>
                <div className="flex justify-between">
                  <span>operator:</span>
                  <strong className="text-blue-700">2222</strong>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsForgotModalOpen(false)}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition cursor-pointer"
            >
              Tutup & Kembali ke Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
