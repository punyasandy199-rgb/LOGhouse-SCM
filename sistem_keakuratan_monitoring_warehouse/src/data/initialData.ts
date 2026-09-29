/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ProductItem, RackData, UserAccount, ActivityLog, RackSlot, EmployeePIC } from '../types';
import { generateSlotsFromLevelAndBays } from '../utils/barcode';

export const INITIAL_USERS: UserAccount[] = [
  {
    id: 'USR-001',
    name: 'Budi Santoso',
    username: 'admin.budi',
    role: 'admin',
    pin: '1234',
    avatarColor: 'bg-indigo-600',
    phone: '0812-3456-7890',
    status: 'active',
    lastActive: 'Baru saja',
    passwordChangedAt: '2026-09-15 08:30',
    passwordHistory: [
      {
        id: 'pwd-1',
        changedAt: '2026-09-15 08:30',
        changedBy: 'Budi Santoso',
        type: 'self_change',
        note: 'Inisialisasi akun & pengaturan kata sandi awal'
      }
    ]
  },
  {
    id: 'USR-002',
    name: 'Ahmad Dani',
    username: 'operator.dani',
    role: 'operator',
    pin: '1234',
    avatarColor: 'bg-teal-600',
    phone: '0813-9876-5432',
    status: 'active',
    lastActive: '5 menit lalu',
    passwordChangedAt: '2026-09-10 14:15',
    passwordHistory: [
      {
        id: 'pwd-2',
        changedAt: '2026-09-10 14:15',
        changedBy: 'Ahmad Dani',
        type: 'self_change',
        note: 'Pembuatan akun oleh SPV'
      }
    ]
  },
  {
    id: 'USR-003',
    name: 'Hendra Wijaya',
    username: 'spv.hendra',
    role: 'superadmin',
    pin: '1234',
    avatarColor: 'bg-amber-600',
    phone: '0811-2233-4455',
    status: 'active',
    lastActive: '12 menit lalu',
    passwordChangedAt: '2026-09-01 09:00',
    passwordHistory: [
      {
        id: 'pwd-3',
        changedAt: '2026-09-01 09:00',
        changedBy: 'Hendra Wijaya',
        type: 'self_change',
        note: 'Setup akun Super Admin / SPV'
      }
    ]
  }
];

export const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: 'PRD-122',
    itemCode: 'FG-COF-122',
    itemName: 'INSTANT COFFEE SIC 25 BR',
    unit: 'BOX',
    category: 'Instant Coffee Bulk',
    boxPerPallet: 15,
    barcode: 'PA274/2612230062026D08614353006202630062028086',
    minStockBox: 60,
    currentStockBox: 0,
    weightPerBoxKg: 30.0,
    description: 'PT. SANTOS JAYA ABADI - Finished Goods Instant Coffee SIC 25 BR. Netto 30 Kg, Gross 32.05 Kg. Maksimal 15 Box per Pallet.'
  },
  {
    id: 'PRD-123',
    itemCode: 'FG-COF-123',
    itemName: 'INSTANT COFFEE ARABICA GOLD 30KG',
    unit: 'BOX',
    category: 'Instant Coffee Bulk',
    boxPerPallet: 15,
    barcode: 'PA275/2612330062026D01515003006202630062028015',
    minStockBox: 60,
    currentStockBox: 0,
    weightPerBoxKg: 30.0,
    description: 'Finished Goods Instant Coffee Arabica Gold. Netto 30 Kg. Maksimal 15 Box per Pallet.'
  },
  {
    id: 'PRD-001',
    itemCode: 'FG-COF-001',
    itemName: 'Instant Coffee Classic 3-in-1',
    unit: 'BOX',
    category: 'Instant Coffee',
    boxPerPallet: 15,
    barcode: '899100100101',
    minStockBox: 60,
    currentStockBox: 0,
    weightPerBoxKg: 8.5,
    description: 'Kopi instan racikan gula & krimer isi 30 sachet x 20g per box.'
  },
  {
    id: 'PRD-002',
    itemCode: 'FG-COF-002',
    itemName: 'Instant Coffee Arabica Gold Blend',
    unit: 'BOX',
    category: 'Instant Coffee',
    boxPerPallet: 15,
    barcode: '899100100102',
    minStockBox: 60,
    currentStockBox: 0,
    weightPerBoxKg: 7.2,
    description: 'Kopi murni 100% Arabica freeze-dried jar 100g per box.'
  }
];

// Helper to build warehouse rack with 4 levels, 13 bays ('a'-'m'), 4 pallet slots per address (Total: 208 Pallet Slots / 3.120 Box / 93.600 Kg)
export function buildFullWarehouseRack(
  id: string,
  primaryProduct: string = 'INSTANT COFFEE SIC 25 BR',
  maxBayChar: string = 'm',
  palletsPerSlot: number = 4
): RackData {
  const startChar = 'a'.charCodeAt(0);
  const endChar = maxBayChar.toLowerCase().charCodeAt(0);
  const baysList: string[] = [];
  const slotsList: string[] = [];
  const slots: Record<string, RackSlot> = {};

  for (let c = startChar; c <= endChar; c++) {
    baysList.push(String.fromCharCode(c));
  }

  for (let lvl = 1; lvl <= 4; lvl++) {
    for (const bay of baysList) {
      const slotSuffix = `${lvl}${bay}`;
      slotsList.push(slotSuffix);
      const fullCode = `${id}${slotSuffix}`;
      slots[fullCode] = {
        slotCode: fullCode,
        level: lvl,
        bay,
        status: 'empty',
        pallets: [],
        maxPalletCapacity: palletsPerSlot,
        isBlocked: false
      };
    }
  }

  const locationCount = slotsList.length; // 52 lokasi alamat (13 baris x 4 tingkat)
  const totalPalletSlots = locationCount * palletsPerSlot; // 52 x 4 = 208 pallet slots

  return {
    id,
    primaryProduct,
    slotsList,
    slotCount: totalPalletSlots, // 208 Pallet Slots
    locationCount,
    palletsPerSlot,
    slots,
    maxLevels: 4,
    baysList,
    notes: `Rak Pallet ${id} - ${baysList.length} Baris x 4 Tingkat = ${locationCount} Alamat x ${palletsPerSlot} Pallet = ${totalPalletSlots} Pallet (${totalPalletSlots * 15} Box / ${totalPalletSlots * 15 * 30} Kg Maks)`
  };
}

// Initial Racks A through I (Bays a through m, 4 levels each) - SEMUA SLOT KOSONG UNTUK SIMULASI FRESH
export function createEmptyRacks(): Record<string, RackData> {
  const rackIds = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  const racks: Record<string, RackData> = {};

  rackIds.forEach(id => {
    racks[id] = buildFullWarehouseRack(id, 'INSTANT COFFEE SIC 25 BR', 'm');
  });

  return racks;
}

// Sample Demo Racks jika user ingin memuat contoh pallet terisi
export function createSampleDemoRacks(): Record<string, RackData> {
  const racks = createEmptyRacks();

  // Seed realistic occupied pallets in Rak A and B
  const samplePallets = [
    {
      rack: 'A',
      slot: 'A1a',
      prod: INITIAL_PRODUCTS[0],
      batch: '274/26',
      line: 'PA' as const,
      pin: '122',
      cStart: 72,
      cEnd: 86,
      cRange: 'D072 - D086 (15 Box)',
      qty: 15,
      prodDate: '2026-06-30',
      prodTime: '14:35',
      expDate: '2028-06-30',
      inbound: '2026-09-22 08:30',
      qr: 'PA274/2612230062026D08614353006202630062028086',
      icStatus: 'OK' as const
    },
    {
      rack: 'A',
      slot: 'A2a',
      prod: INITIAL_PRODUCTS[0],
      batch: '274/26',
      line: 'PA' as const,
      pin: '122',
      cStart: 57,
      cEnd: 71,
      cRange: 'D057 - D071 (15 Box)',
      qty: 15,
      prodDate: '2026-06-30',
      prodTime: '14:10',
      expDate: '2028-06-30',
      inbound: '2026-09-22 08:45',
      qr: 'PA274/2612230062026D071141030062028071',
      icStatus: 'HOLD' as const
    },
    {
      rack: 'A',
      slot: 'A3a',
      prod: INITIAL_PRODUCTS[1],
      batch: '275/26',
      line: 'PB' as const,
      pin: '123',
      cStart: 1,
      cEnd: 15,
      cRange: 'D001 - D015 (15 Box)',
      qty: 15,
      prodDate: '2026-06-30',
      prodTime: '15:00',
      expDate: '2028-06-30',
      inbound: '2026-09-22 09:15',
      qr: 'PB275/2612330062026D01515003006202630062028015',
      icStatus: 'BO' as const
    },
    {
      rack: 'B',
      slot: 'B1a',
      prod: INITIAL_PRODUCTS[0],
      batch: '274/26',
      line: 'PA' as const,
      pin: '122',
      cStart: 42,
      cEnd: 56,
      cRange: 'D042 - D056 (15 Box)',
      qty: 15,
      prodDate: '2026-06-30',
      prodTime: '13:45',
      expDate: '2028-06-30',
      inbound: '2026-09-22 10:00',
      qr: 'PA274/2612230062026D05613453006202630062028056',
      icStatus: 'OK' as const
    }
  ];

  samplePallets.forEach(sp => {
    if (racks[sp.rack] && racks[sp.rack].slots[sp.slot]) {
      racks[sp.rack].slots[sp.slot] = {
        ...racks[sp.rack].slots[sp.slot],
        status: 'occupied',
        pallet: {
          palletId: `PLT-${sp.slot}-${sp.batch.replace('/', '-')}`,
          itemCode: sp.prod.itemCode,
          itemName: sp.prod.itemName,
          quantityBox: sp.qty,
          unit: 'BOX',
          batchNo: sp.batch,
          packingLine: sp.line,
          productPin: sp.pin,
          cartonStart: sp.cStart,
          cartonEnd: sp.cEnd,
          cartonRangeText: sp.cRange,
          productionDate: sp.prodDate,
          productionTime: sp.prodTime,
          expiryDate: sp.expDate,
          inboundDate: sp.inbound,
          inboundBy: 'Ahmad Dani (Operator)',
          isVerifiedAudit: true,
          rawQrCode: sp.qr,
          icStatus: sp.icStatus,
          notes: 'Kondisi kemasan karton 30 Kg rapi, plastik wrapping 15 box utuh.'
        }
      };
    }
  });

  return racks;
}

// Default initial racks adalah kosong untuk simulasi baru
export function createInitialRacks(): Record<string, RackData> {
  return createEmptyRacks();
}

export const INITIAL_LOGS: ActivityLog[] = [
  {
    id: 'LOG-000',
    timestamp: '2026-09-28 08:00:00',
    userId: 'USR-001',
    userName: 'Budi Santoso',
    userRole: 'admin',
    action: 'RESET_SYSTEM',
    slotCode: 'ALL_SLOTS',
    itemCode: 'ALL_ITEMS',
    quantityBox: 0,
    description: 'Sistem Inisialisasi: Seluruh slot rak gudang Finished Goods (FGW) berstatus EMPTY (0 Box). Siap untuk simulasi alur proses Inbound, Putaway, Opname, dan Outbound FEFO.'
  }
];

export const INITIAL_EMPLOYEES: EmployeePIC[] = [
  {
    id: 'EMP-001',
    hrisId: '2161105',
    idCard: 'IDC-908122',
    nik: '2161105',
    name: 'Budi Santoso',
    department: 'Warehouse FGW',
    position: 'Supervisor Gudang & Koordinator Opname',
    phone: '0812-3456-7890',
    status: 'active'
  },
  {
    id: 'EMP-002',
    hrisId: '2161106',
    idCard: 'IDC-908123',
    nik: '2161106',
    name: 'Siti Aminah',
    department: 'Quality Control (QC)',
    position: 'QC Inspector FGW',
    phone: '0813-2211-4455',
    status: 'active'
  },
  {
    id: 'EMP-003',
    hrisId: '2161107',
    idCard: 'IDC-908124',
    nik: '2161107',
    name: 'Ahmad Fauzi',
    department: 'Warehouse FGW',
    position: 'Operator Forklift & Re-stacker',
    phone: '0812-8877-6655',
    status: 'active'
  },
  {
    id: 'EMP-004',
    hrisId: '1980412',
    idCard: 'IDC-871101',
    nik: '1980412',
    name: 'Hendra Gunawan',
    department: 'Finance & Accounting',
    position: 'Internal Stock Auditor',
    phone: '0811-3344-5566',
    status: 'active'
  },
  {
    id: 'EMP-005',
    hrisId: '2240501',
    idCard: 'IDC-920401',
    nik: '2240501',
    name: 'Rian Pratama',
    department: 'Warehouse FGW',
    position: 'Checker Logistik',
    phone: '0857-1122-3344',
    status: 'active'
  },
  {
    id: 'EMP-006',
    hrisId: '2023089',
    idCard: 'IDC-911029',
    nik: '2023089',
    name: 'Dewi Lestari',
    department: 'Supply Chain Management',
    position: 'Inventory Controller',
    phone: '0819-7766-5544',
    status: 'active'
  },
  {
    id: 'EMP-007',
    hrisId: '2280614',
    idCard: 'IDC-930614',
    nik: '2280614',
    name: 'ARGA VERBRIANTO',
    department: 'SUPPLY CHAIN',
    position: 'Supply Chain Auditor',
    phone: '0812-7788-9900',
    status: 'active'
  }
];

