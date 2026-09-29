/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  User, 
  ChevronDown, 
  Radio, 
  Boxes, 
  Wifi, 
  Lock,
  Layers,
  Sparkles,
  KeyRound,
  LogOut,
  UserCheck,
  Home,
  LayoutDashboard,
  ArrowDownToLine,
  ArrowUpFromLine,
  Database,
  Settings,
  ClipboardCheck,
  BookOpen,
  GitFork,
  Workflow,
  RotateCcw,
  Monitor,
  Smartphone
} from 'lucide-react';
import { UserAccount, UserRole } from '../types';
import { CartoonWarehouseLogo } from './CartoonWarehouseLogo';

export type MainModule = 'main-hub' | 'dashboard' | 'in-warehouse' | 'out-warehouse' | 'stock-opname' | 'data-master' | 'configuration-system' | 'sop-flowchart';

interface HeaderProps {
  currentUser: UserAccount;
  users: UserAccount[];
  onSwitchUser: (user: UserAccount) => void;
  onOpenScanner?: () => void;
  onOpenRackQrPrint?: () => void;
  onOpenLoginModal?: () => void;
  onOpenChangePasswordModal?: () => void;
  onOpenClearDataModal?: () => void;
  onLogout: () => void;
  activeMainModule: MainModule;
  onSelectMainModule: (module: MainModule) => void;
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  deviceViewMode?: 'web' | 'android';
  onToggleDeviceViewMode?: (mode: 'web' | 'android') => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  users,
  onSwitchUser,
  onOpenScanner,
  onOpenRackQrPrint,
  onOpenLoginModal,
  onOpenChangePasswordModal,
  onOpenClearDataModal,
  onLogout,
  activeMainModule,
  onSelectMainModule,
  activeTab,
  onSelectTab,
  deviceViewMode = 'web',
  onToggleDeviceViewMode
}) => {
  const [timeStr, setTimeStr] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const getModuleBadgeInfo = (module: MainModule) => {
    switch (module) {
      case 'dashboard':
        return {
          label: 'DASHBOARD',
          badgeClass: 'bg-blue-600 text-white shadow-xs ring-1 ring-blue-500/50',
          dotColor: 'bg-blue-600',
          pingColor: 'bg-blue-400'
        };
      case 'in-warehouse':
        return {
          label: 'PROSES IN',
          badgeClass: 'bg-emerald-600 text-white shadow-xs ring-1 ring-emerald-500/50',
          dotColor: 'bg-emerald-600',
          pingColor: 'bg-emerald-400'
        };
      case 'out-warehouse':
        return {
          label: 'PROSES OUT',
          badgeClass: 'bg-rose-600 text-white shadow-xs ring-1 ring-rose-500/50',
          dotColor: 'bg-rose-600',
          pingColor: 'bg-rose-400'
        };
      case 'stock-opname':
        return {
          label: 'STOCK OPNAME',
          badgeClass: 'bg-amber-600 text-white shadow-xs ring-1 ring-amber-500/50',
          dotColor: 'bg-amber-600',
          pingColor: 'bg-amber-400'
        };
      case 'data-master':
        return {
          label: 'DATA MASTER',
          badgeClass: 'bg-indigo-600 text-white shadow-xs ring-1 ring-indigo-500/50',
          dotColor: 'bg-indigo-600',
          pingColor: 'bg-indigo-400'
        };
      case 'configuration-system':
        return {
          label: 'CONFIGURATION',
          badgeClass: 'bg-slate-900 text-white shadow-xs ring-1 ring-slate-700/50',
          dotColor: 'bg-slate-900',
          pingColor: 'bg-slate-500'
        };
      case 'sop-flowchart':
        return {
          label: 'SOP & ALUR PROSES',
          badgeClass: 'bg-blue-600 text-white shadow-xs ring-1 ring-blue-500/50',
          dotColor: 'bg-blue-600',
          pingColor: 'bg-blue-400'
        };
      case 'main-hub':
      default:
        return {
          label: 'WMS FGW',
          badgeClass: 'bg-cyan-100 text-cyan-800 ring-1 ring-cyan-300/60',
          dotColor: 'bg-cyan-500',
          pingColor: 'bg-cyan-400'
        };
    }
  };

  const activeBadge = getModuleBadgeInfo(activeMainModule);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleDateString('id-ID', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }) + ' ' + now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand Logo & Name - Klik untuk Akses Dashboard Gudang */}
          <div 
            onClick={() => onSelectMainModule('dashboard')}
            className="flex items-center gap-3.5 cursor-pointer hover:opacity-95 transition group relative"
            title="SIKUTANG WMS - Klik logo ini untuk membuka Dashboard Monitoring Gudang"
          >
            <div className="relative">
              <CartoonWarehouseLogo size={52} variant="compact" />
              <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5" title={`Modul Aktif: ${activeBadge.label}`}>
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${activeBadge.pingColor} opacity-75`}></span>
                <span className={`relative inline-flex rounded-full h-3.5 w-3.5 ${activeBadge.dotColor} border-2 border-white`}></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black tracking-tight text-slate-950 font-sans group-hover:text-blue-600 transition">
                  SIKUTANG
                </h1>
                <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider transition-all duration-200 ${activeBadge.badgeClass}`}>
                  {activeBadge.label}
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-600 hidden sm:flex items-center gap-1.5">
                <span>Sistem Keakuratan Monitoring Barang Jadi</span>
              </p>
            </div>
          </div>

          {/* Status & Current User Selector */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Real-time Status Badge */}
            <div className={`${deviceViewMode === 'android' ? 'hidden' : 'hidden sm:flex'} items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold`}>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Online Terintegrasi</span>
              <span className="text-slate-600">&bull;</span>
              <span className="font-mono text-[11px]">{timeStr}</span>
            </div>

            {/* Platform View Selector: Web Desktop vs Android Handheld - Logo Saja (Simple Icon Only) */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 shrink-0">
              <button
                type="button"
                onClick={() => onToggleDeviceViewMode?.('web')}
                className={`p-1.5 rounded-lg transition cursor-pointer flex items-center justify-center ${
                  deviceViewMode === 'web'
                    ? 'bg-white text-blue-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Tampilan Web Desktop (Layar Penuh)"
                aria-label="Web Desktop"
              >
                <Monitor className="w-4 h-4 text-blue-600" />
              </button>
              <button
                type="button"
                onClick={() => onToggleDeviceViewMode?.('android')}
                className={`p-1.5 rounded-lg transition cursor-pointer flex items-center justify-center ${
                  deviceViewMode === 'android'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Tampilan Android Smartphone / Handheld Scanner"
                aria-label="Android Smartphone"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Action: Reset Data Simulasi (Hanya untuk Akun Superadmin) */}
            {onOpenClearDataModal && currentUser.role === 'superadmin' && (
              <button
                onClick={onOpenClearDataModal}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-xs font-black transition cursor-pointer shadow-xs"
                title="Kosongkan stok IC rak untuk simulasi baru (Master data rak tetap utuh)"
              >
                <RotateCcw className="w-3.5 h-3.5 text-rose-600" />
                <span className="hidden md:inline">Reset / Kosongkan Simulasi</span>
                <span className="md:hidden hidden sm:inline">Reset IC</span>
              </button>
            )}

            {/* User Profile & Role Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition cursor-pointer border border-slate-200"
              >
                <div className={`w-8 h-8 rounded-lg ${currentUser.avatarColor} text-white font-black text-xs flex items-center justify-center`}>
                  {currentUser.name.charAt(0)}
                </div>
                <div className="text-left hidden sm:block">
                  <span className="block text-xs font-bold text-slate-900 leading-tight">
                    {currentUser.name}
                  </span>
                  <span className="block text-[10px] font-extrabold uppercase tracking-wider text-cyan-700 font-mono">
                    {currentUser.role}
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-500" />
              </button>

              {/* User Switch Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="p-3 border-b border-slate-100 bg-slate-50 rounded-xl mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-9 h-9 rounded-xl ${currentUser.avatarColor} text-white font-black text-sm flex items-center justify-center shrink-0`}>
                        {currentUser.name.charAt(0)}
                      </div>
                      <div className="overflow-hidden">
                        <span className="block text-xs font-bold text-slate-900 truncate">
                          {currentUser.name}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500 block truncate">
                          @{currentUser.username}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-800">
                        {currentUser.role === 'superadmin'
                          ? 'Super Admin'
                          : currentUser.role === 'supervisor'
                          ? 'Supervisor (SPV)'
                          : currentUser.role === 'admin'
                          ? 'Admin Gudang'
                          : 'Operator Scanner'}
                      </span>
                      <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        Aktif
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    {/* Buka Dashboard Monitoring */}
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onSelectMainModule('dashboard');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-800 transition cursor-pointer"
                    >
                      <LayoutDashboard className="w-4 h-4 text-blue-600" />
                      <span>Buka Dashboard Gudang</span>
                    </button>

                    {/* Reset Data Simulasi (Hanya Superadmin) */}
                    {onOpenClearDataModal && currentUser.role === 'superadmin' && (
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          onOpenClearDataModal();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-bold text-rose-700 hover:bg-rose-50 transition cursor-pointer"
                      >
                        <RotateCcw className="w-4 h-4 text-rose-600" />
                        <span>Reset Data Simulasi (Superadmin)</span>
                      </button>
                    )}

                    {/* Ubah Kata Sandi Saya */}
                    {onOpenChangePasswordModal && (
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          onOpenChangePasswordModal();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-bold text-slate-700 hover:bg-cyan-50 hover:text-cyan-800 transition cursor-pointer"
                      >
                        <KeyRound className="w-4 h-4 text-cyan-600" />
                        <span>Ubah Kata Sandi Saya</span>
                      </button>
                    )}

                    {/* Keluar Sesi / Logout */}
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onLogout();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-bold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-slate-600" />
                      <span>Keluar Akun (Logout)</span>
                    </button>
                  </div>

                  <div className="pt-2 border-t border-slate-100 px-3 py-1.5 mt-1">
                    <span className="text-[10px] text-slate-500 block leading-tight">
                      Sesuai SOP keamanan, pergantian petugas gudang wajib melalui verifikasi kata sandi (login ulang).
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* PILIHAN MENU UTAMA: DASHBOARD, PROSES IN, PROSES OUT, DATA MASTER,   */}
        {/* CONFIGURATION SYSTEM                                                */}
        {/* ==================================================================== */}
        {/* PILIHAN MENU: PROSES IN, PROSES OUT, STOCK OPNAME, DATA MASTER,      */}
        {/* CONFIGURATION SYSTEM, DAN SOP & ALUR PROSES                          */}
        {/* ==================================================================== */}
        <div className={`border-t border-slate-100 py-2 ${
          deviceViewMode === 'android'
            ? 'grid grid-cols-3 gap-1.5 w-full'
            : 'flex flex-wrap items-center justify-between gap-1.5 sm:gap-2'
        }`}>
          <div className={`${deviceViewMode === 'android' ? 'contents' : 'flex flex-wrap items-center gap-1.5 sm:gap-2'}`}>
            {/* Pilihan 1: Proses In */}
            <button
              onClick={() => onSelectMainModule('in-warehouse')}
              className={`py-1.5 px-2 sm:px-3 rounded-xl text-[11px] sm:text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 border-2 ${
                activeMainModule === 'in-warehouse'
                  ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs ring-1 ring-emerald-500/20'
                  : 'border-emerald-200 text-emerald-800 bg-emerald-50/80 hover:bg-emerald-100'
              }`}
              title="Proses In (Inbound Putaway)"
            >
              <ArrowDownToLine className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{deviceViewMode === 'android' ? 'Inbound' : 'Proses In'}</span>
            </button>

            {/* Pilihan 2: Proses Out */}
            <button
              onClick={() => onSelectMainModule('out-warehouse')}
              className={`py-1.5 px-2 sm:px-3 rounded-xl text-[11px] sm:text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 border-2 ${
                activeMainModule === 'out-warehouse'
                  ? 'bg-rose-600 border-rose-600 text-white shadow-xs ring-1 ring-rose-500/20'
                  : 'border-rose-200 text-rose-800 bg-rose-50/80 hover:bg-rose-100'
              }`}
              title="Proses Out (Outbound Picking)"
            >
              <ArrowUpFromLine className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{deviceViewMode === 'android' ? 'Outbound' : 'Proses Out'}</span>
            </button>

            {/* Pilihan 3: Stock Opname */}
            <button
              onClick={() => onSelectMainModule('stock-opname')}
              className={`py-1.5 px-2 sm:px-3 rounded-xl text-[11px] sm:text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 border-2 ${
                activeMainModule === 'stock-opname'
                  ? 'bg-amber-600 border-amber-600 text-white shadow-xs ring-1 ring-amber-500/20'
                  : 'border-amber-300 text-amber-900 bg-amber-50/80 hover:bg-amber-100'
              }`}
              title="Stock Opname (Audit Fisik)"
            >
              <ClipboardCheck className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{deviceViewMode === 'android' ? 'Opname' : 'Stock Opname'}</span>
            </button>

            {/* Pilihan 4: Data Master */}
            <button
              onClick={() => onSelectMainModule('data-master')}
              className={`py-1.5 px-2 sm:px-3 rounded-xl text-[11px] sm:text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 border-2 ${
                activeMainModule === 'data-master'
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-xs ring-1 ring-indigo-500/20'
                  : 'border-indigo-200 text-indigo-800 bg-indigo-50/80 hover:bg-indigo-100'
              }`}
              title="Data Master (Rak, Produk, Karyawan)"
            >
              <Database className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{deviceViewMode === 'android' ? 'Master' : 'Data Master'}</span>
            </button>

            {/* Pilihan 5: Configuration System */}
            <button
              onClick={() => onSelectMainModule('configuration-system')}
              className={`py-1.5 px-2 sm:px-3 rounded-xl text-[11px] sm:text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 border-2 ${
                activeMainModule === 'configuration-system'
                  ? 'bg-slate-900 border-slate-900 text-white shadow-xs ring-1 ring-slate-700/20'
                  : 'border-slate-200 text-slate-800 bg-slate-100 hover:bg-slate-200'
              }`}
              title="Configuration System (Pengaturan & Simulasi)"
            >
              <Settings className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{deviceViewMode === 'android' ? 'Config' : 'Configuration'}</span>
            </button>

            {/* Pilihan 6: SOP & Alur Proses */}
            <button
              onClick={() => onSelectMainModule('sop-flowchart')}
              className={`py-1.5 px-2 sm:px-3 rounded-xl text-[11px] sm:text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 border-2 ${
                activeMainModule === 'sop-flowchart'
                  ? 'bg-blue-600 border-blue-600 text-white shadow-xs ring-1 ring-blue-500/20'
                  : 'border-blue-200 text-blue-800 bg-blue-50/80 hover:bg-blue-100'
              }`}
              title="SOP & Alur Proses Pergudangan"
            >
              <Workflow className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{deviceViewMode === 'android' ? 'SOP' : 'SOP & Alur'}</span>
            </button>
          </div>

          {/* Modul Aktif Status Badge (Desktop Only) */}
          {deviceViewMode !== 'android' && (
            <div className="hidden xl:flex items-center gap-2 shrink-0">
              <span className="text-[11px] font-bold text-slate-500">
                Modul Aktif:
              </span>
              <span className="text-xs font-black uppercase font-mono px-2 py-0.5 rounded-lg bg-slate-100 text-slate-800 border border-slate-200">
                {activeMainModule === 'in-warehouse' ? 'Proses In (Inbound)' :
                 activeMainModule === 'out-warehouse' ? 'Proses Out (Outbound)' :
                 activeMainModule === 'stock-opname' ? 'Stock Opname (Audit)' :
                 activeMainModule === 'data-master' ? 'Data Master' :
                 activeMainModule === 'configuration-system' ? 'Configuration System' :
                 activeMainModule === 'sop-flowchart' ? 'SOP & Flowchart Alur' :
                 activeMainModule === 'dashboard' || activeMainModule === 'main-hub' ? 'Dashboard Monitoring' :
                 'Proses In (Inbound)'}
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
