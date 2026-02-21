import { useState } from 'react';
import { Settings, Power, Clock, TrendingUp, AlertCircle, CheckCircle, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface Equipment {
  id: number;
  name: string;
  category: string;
  location: string;
  status: 'active' | 'idle' | 'maintenance' | 'error';
  power: number;
  efficiency: number;
  emissions: {
    co2: number;
    so2: number;
    nox: number;
  };
  workingHours: number;
  lastMaintenance: string;
  nextMaintenance: string;
}

const equipmentData: Equipment[] = [
  {
    id: 1,
    name: 'Котельная установка №1',
    category: 'Котельное оборудование',
    location: 'Цех А',
    status: 'active',
    power: 85,
    efficiency: 92,
    emissions: {
      co2: 145,
      so2: 28,
      nox: 35,
    },
    workingHours: 8240,
    lastMaintenance: '10.12.2025',
    nextMaintenance: '10.03.2026',
  },
  {
    id: 2,
    name: 'Промышленная печь №2',
    category: 'Термическое оборудование',
    location: 'Цех Б',
    status: 'active',
    power: 92,
    efficiency: 88,
    emissions: {
      co2: 210,
      so2: 42,
      nox: 58,
    },
    workingHours: 6850,
    lastMaintenance: '15.01.2026',
    nextMaintenance: '15.04.2026',
  },
  {
    id: 3,
    name: 'Вентиляционная система №3',
    category: 'Вентиляционное оборудование',
    location: 'Цех А',
    status: 'idle',
    power: 0,
    efficiency: 95,
    emissions: {
      co2: 0,
      so2: 0,
      nox: 0,
    },
    workingHours: 12450,
    lastMaintenance: '20.01.2026',
    nextMaintenance: '20.04.2026',
  },
  {
    id: 4,
    name: 'Компрессорная станция №4',
    category: 'Компрессорное оборудование',
    location: 'Цех В',
    status: 'active',
    power: 78,
    efficiency: 85,
    emissions: {
      co2: 98,
      so2: 15,
      nox: 22,
    },
    workingHours: 9560,
    lastMaintenance: '05.01.2026',
    nextMaintenance: '05.04.2026',
  },
  {
    id: 5,
    name: 'Дизель-генератор №5',
    category: 'Энергетическое оборудование',
    location: 'Энергоблок',
    status: 'maintenance',
    power: 0,
    efficiency: 82,
    emissions: {
      co2: 0,
      so2: 0,
      nox: 0,
    },
    workingHours: 3240,
    lastMaintenance: '12.02.2026',
    nextMaintenance: '12.05.2026',
  },
  {
    id: 6,
    name: 'Очистная установка №6',
    category: 'Очистное оборудование',
    location: 'Очистные сооружения',
    status: 'error',
    power: 45,
    efficiency: 65,
    emissions: {
      co2: 75,
      so2: 32,
      nox: 48,
    },
    workingHours: 15200,
    lastMaintenance: '01.12.2025',
    nextMaintenance: '01.03.2026',
  },
];

export function Equipment() {
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment>(equipmentData[0]);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
        return {
          icon: CheckCircle,
          text: 'Работает',
          color: 'emerald',
          bg: 'bg-emerald-50',
          text_color: 'text-emerald-700',
          dot: 'bg-emerald-500',
        };
      case 'idle':
        return {
          icon: Power,
          text: 'Простой',
          color: 'slate',
          bg: 'bg-slate-50',
          text_color: 'text-slate-700',
          dot: 'bg-slate-400',
        };
      case 'maintenance':
        return {
          icon: Settings,
          text: 'Обслуживание',
          color: 'blue',
          bg: 'bg-blue-50',
          text_color: 'text-blue-700',
          dot: 'bg-blue-500',
        };
      case 'error':
        return {
          icon: AlertCircle,
          text: 'Ошибка',
          color: 'red',
          bg: 'bg-red-50',
          text_color: 'text-red-700',
          dot: 'bg-red-500',
        };
      default:
        return {
          icon: Power,
          text: 'Неизвестно',
          color: 'slate',
          bg: 'bg-slate-50',
          text_color: 'text-slate-700',
          dot: 'bg-slate-400',
        };
    }
  };

  const emissionsChartData = [
    { name: 'CO₂', value: selectedEquipment.emissions.co2, color: '#10b981' },
    { name: 'SO₂', value: selectedEquipment.emissions.so2, color: '#3b82f6' },
    { name: 'NOₓ', value: selectedEquipment.emissions.nox, color: '#f59e0b' },
  ];

  const totalEmissions = equipmentData.reduce(
    (acc, eq) => acc + eq.emissions.co2 + eq.emissions.so2 + eq.emissions.nox,
    0
  );

  const activeCount = equipmentData.filter((e) => e.status === 'active').length;
  const avgEfficiency =
    equipmentData.reduce((acc, eq) => acc + eq.efficiency, 0) / equipmentData.length;

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Управление оборудованием</h2>
        <p className="text-slate-500 mt-1">Мониторинг и контроль производственного оборудования</p>
      </div>

      {/* Общая статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
              <Settings className="text-emerald-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Всего единиц</p>
              <p className="text-2xl font-semibold text-slate-900">{equipmentData.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Power className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-slate-500">В работе</p>
              <p className="text-2xl font-semibold text-slate-900">{activeCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-amber-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Средний КПД</p>
              <p className="text-2xl font-semibold text-slate-900">{avgEfficiency.toFixed(1)}%</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-rose-50 rounded-lg flex items-center justify-center">
              <BarChart3 className="text-rose-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Выбросы (сутки)</p>
              <p className="text-2xl font-semibold text-slate-900">{totalEmissions.toFixed(0)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Список оборудования */}
        <div className="lg:col-span-1 bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Список оборудования</h3>
          <div className="space-y-2">
            {equipmentData.map((equipment) => {
              const statusConfig = getStatusConfig(equipment.status);
              const isSelected = selectedEquipment.id === equipment.id;

              return (
                <button
                  key={equipment.id}
                  onClick={() => setSelectedEquipment(equipment)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    isSelected
                      ? 'border-emerald-300 bg-emerald-50'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">{equipment.name}</p>
                      <p className="text-sm text-slate-500 mt-1">{equipment.location}</p>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${statusConfig.dot} mt-2`} />
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">{equipment.category}</span>
                    {equipment.status === 'active' && (
                      <span className="text-emerald-600 font-medium">{equipment.power}%</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Детали оборудования */}
        <div className="lg:col-span-2 space-y-6">
          {/* Основная информация */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="font-semibold text-slate-900 text-xl">{selectedEquipment.name}</h3>
                <p className="text-slate-500 mt-1">{selectedEquipment.category}</p>
              </div>
              {(() => {
                const statusConfig = getStatusConfig(selectedEquipment.status);
                const StatusIcon = statusConfig.icon;
                return (
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${statusConfig.bg}`}>
                    <StatusIcon className={statusConfig.text_color} size={18} />
                    <span className={`text-sm ${statusConfig.text_color}`}>
                      {statusConfig.text}
                    </span>
                  </div>
                );
              })()}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-500 mb-1">Мощность</p>
                <p className="text-2xl font-semibold text-slate-900">{selectedEquipment.power}%</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-500 mb-1">КПД</p>
                <p className="text-2xl font-semibold text-slate-900">{selectedEquipment.efficiency}%</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-500 mb-1">Наработка</p>
                <p className="text-2xl font-semibold text-slate-900">{selectedEquipment.workingHours}</p>
                <p className="text-xs text-slate-500 mt-1">часов</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-500 mb-1">Расположение</p>
                <p className="text-base font-medium text-slate-900 mt-2">{selectedEquipment.location}</p>
              </div>
            </div>
          </div>

          {/* Расчет выбросов */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Расчет выбросов от оборудования</h3>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <p className="text-sm text-emerald-700 mb-1">CO₂</p>
                <p className="text-2xl font-semibold text-emerald-900">
                  {selectedEquipment.emissions.co2}
                </p>
                <p className="text-xs text-emerald-600 mt-1">мг/м³</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-700 mb-1">SO₂</p>
                <p className="text-2xl font-semibold text-blue-900">
                  {selectedEquipment.emissions.so2}
                </p>
                <p className="text-xs text-blue-600 mt-1">мкг/м³</p>
              </div>
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-amber-700 mb-1">NOₓ</p>
                <p className="text-2xl font-semibold text-amber-900">
                  {selectedEquipment.emissions.nox}
                </p>
                <p className="text-xs text-amber-600 mt-1">мкг/м³</p>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={emissionsChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" style={{ fontSize: '12px' }} />
                <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {emissionsChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            <div className="mt-4 p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-600">
                <span className="font-medium">Суммарные выбросы:</span>{' '}
                {(
                  selectedEquipment.emissions.co2 +
                  selectedEquipment.emissions.so2 +
                  selectedEquipment.emissions.nox
                ).toFixed(1)}{' '}
                мг/м³
              </p>
            </div>
          </div>

          {/* Обслуживание */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="text-slate-600" size={20} />
              <h3 className="font-semibold text-slate-900">График обслуживания</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-500 mb-1">Последнее обслуживание</p>
                <p className="text-slate-900 font-medium">{selectedEquipment.lastMaintenance}</p>
              </div>
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-amber-700 mb-1">Следующее обслуживание</p>
                <p className="text-amber-900 font-medium">{selectedEquipment.nextMaintenance}</p>
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <button className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                Запланировать ТО
              </button>
              <button className="flex-1 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors">
                История обслуживания
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
