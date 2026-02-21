import { useState } from 'react';
import { Gauge, MapPin, Calendar, TrendingUp, Activity, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const sensorsData = [
  {
    id: 1,
    name: 'Датчик CO₂ #1',
    type: 'CO₂',
    location: 'Цех А, зона 1',
    status: 'active',
    value: 348,
    unit: 'мг/м³',
    limit: 400,
    lastCalibration: '15.01.2026',
    nextCalibration: '15.04.2026',
  },
  {
    id: 2,
    name: 'Датчик SO₂ #2',
    type: 'SO₂',
    location: 'Цех Б, зона 3',
    status: 'active',
    value: 52,
    unit: 'мкг/м³',
    limit: 70,
    lastCalibration: '20.01.2026',
    nextCalibration: '20.04.2026',
  },
  {
    id: 3,
    name: 'Датчик NOₓ #3',
    type: 'NOₓ',
    location: 'Выхлопная труба #1',
    status: 'warning',
    value: 65,
    unit: 'мкг/м³',
    limit: 50,
    lastCalibration: '10.01.2026',
    nextCalibration: '10.04.2026',
  },
  {
    id: 4,
    name: 'Датчик PM2.5 #4',
    type: 'PM2.5',
    location: 'Склад материалов',
    status: 'active',
    value: 31,
    unit: 'мкг/м³',
    limit: 45,
    lastCalibration: '25.01.2026',
    nextCalibration: '25.04.2026',
  },
  {
    id: 5,
    name: 'Датчик температуры #5',
    type: 'Температура',
    location: 'Цех А, зона 2',
    status: 'error',
    value: 0,
    unit: '°C',
    limit: 50,
    lastCalibration: '05.01.2026',
    nextCalibration: '05.04.2026',
  },
  {
    id: 6,
    name: 'Датчик CO₂ #6',
    type: 'CO₂',
    location: 'Цех В, зона 5',
    status: 'active',
    value: 312,
    unit: 'мг/м³',
    limit: 400,
    lastCalibration: '18.01.2026',
    nextCalibration: '18.04.2026',
  },
];

const generateHistoryData = () => {
  return Array.from({ length: 20 }, (_, i) => ({
    time: `${20 - i}m`,
    value: 30 + Math.random() * 40,
  }));
};

export function Sensors() {
  const [selectedSensor, setSelectedSensor] = useState(sensorsData[0]);
  const [historyData] = useState(generateHistoryData());

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
        return {
          icon: CheckCircle,
          text: 'Активен',
          color: 'emerald',
          bg: 'bg-emerald-50',
          text_color: 'text-emerald-700',
          border: 'border-emerald-200',
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          text: 'Предупреждение',
          color: 'amber',
          bg: 'bg-amber-50',
          text_color: 'text-amber-700',
          border: 'border-amber-200',
        };
      case 'error':
        return {
          icon: XCircle,
          text: 'Ошибка',
          color: 'red',
          bg: 'bg-red-50',
          text_color: 'text-red-700',
          border: 'border-red-200',
        };
      default:
        return {
          icon: Activity,
          text: 'Неизвестно',
          color: 'slate',
          bg: 'bg-slate-50',
          text_color: 'text-slate-700',
          border: 'border-slate-200',
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Мониторинг датчиков</h2>
        <p className="text-slate-500 mt-1">Управление и контроль измерительных приборов</p>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
              <Gauge className="text-emerald-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Всего датчиков</p>
              <p className="text-2xl font-semibold text-slate-900">{sensorsData.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
              <CheckCircle className="text-emerald-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Активные</p>
              <p className="text-2xl font-semibold text-slate-900">
                {sensorsData.filter((s) => s.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
              <AlertTriangle className="text-amber-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Предупреждения</p>
              <p className="text-2xl font-semibold text-slate-900">
                {sensorsData.filter((s) => s.status === 'warning').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
              <XCircle className="text-red-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Ошибки</p>
              <p className="text-2xl font-semibold text-slate-900">
                {sensorsData.filter((s) => s.status === 'error').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Список датчиков */}
        <div className="lg:col-span-1 bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Список датчиков</h3>
          <div className="space-y-2">
            {sensorsData.map((sensor) => {
              const statusConfig = getStatusConfig(sensor.status);
              const StatusIcon = statusConfig.icon;
              const isSelected = selectedSensor.id === sensor.id;

              return (
                <button
                  key={sensor.id}
                  onClick={() => setSelectedSensor(sensor)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    isSelected
                      ? 'border-emerald-300 bg-emerald-50'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-slate-900">{sensor.name}</p>
                      <p className="text-sm text-slate-500 mt-1">{sensor.location}</p>
                    </div>
                    <StatusIcon className={statusConfig.text_color} size={18} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">{sensor.type}</span>
                    {sensor.status !== 'error' && (
                      <span className="font-mono text-sm text-slate-700">
                        {sensor.value} {sensor.unit}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Детали датчика */}
        <div className="lg:col-span-2 space-y-6">
          {/* Информация о датчике */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="font-semibold text-slate-900 text-xl">{selectedSensor.name}</h3>
                <p className="text-slate-500 mt-1">{selectedSensor.type}</p>
              </div>
              {(() => {
                const statusConfig = getStatusConfig(selectedSensor.status);
                const StatusIcon = statusConfig.icon;
                return (
                  <div
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg ${statusConfig.bg} ${statusConfig.border} border`}
                  >
                    <StatusIcon className={statusConfig.text_color} size={18} />
                    <span className={`text-sm ${statusConfig.text_color}`}>
                      {statusConfig.text}
                    </span>
                  </div>
                );
              })()}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="text-slate-400 mt-1" size={18} />
                  <div>
                    <p className="text-sm text-slate-500">Расположение</p>
                    <p className="text-slate-900">{selectedSensor.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="text-slate-400 mt-1" size={18} />
                  <div>
                    <p className="text-sm text-slate-500">Текущее значение</p>
                    {selectedSensor.status !== 'error' ? (
                      <p className="text-slate-900 font-mono">
                        {selectedSensor.value} {selectedSensor.unit}
                      </p>
                    ) : (
                      <p className="text-red-600">Нет данных</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Activity className="text-slate-400 mt-1" size={18} />
                  <div>
                    <p className="text-sm text-slate-500">Предельное значение (ПДК)</p>
                    <p className="text-slate-900 font-mono">
                      {selectedSensor.limit} {selectedSensor.unit}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="text-slate-400 mt-1" size={18} />
                  <div>
                    <p className="text-sm text-slate-500">Последняя калибровка</p>
                    <p className="text-slate-900">{selectedSensor.lastCalibration}</p>
                  </div>
                </div>
              </div>
            </div>

            {selectedSensor.status !== 'error' && (
              <div className="mt-6">
                <div className="flex justify-between text-sm text-slate-500 mb-2">
                  <span>Загрузка</span>
                  <span>
                    {((selectedSensor.value / selectedSensor.limit) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all ${
                      selectedSensor.status === 'warning'
                        ? 'bg-amber-500'
                        : 'bg-emerald-500'
                    }`}
                    style={{
                      width: `${Math.min(
                        (selectedSensor.value / selectedSensor.limit) * 100,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* График истории */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900 mb-4">
              История показаний (последние 20 минут)
            </h3>
            {selectedSensor.status !== 'error' ? (
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={historyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="time" stroke="#64748b" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#10b981"
                    fill="#10b98120"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[250px] flex items-center justify-center bg-slate-50 rounded-lg">
                <div className="text-center">
                  <XCircle className="text-red-400 mx-auto mb-2" size={48} />
                  <p className="text-slate-600">Нет данных с датчика</p>
                  <p className="text-sm text-slate-400 mt-1">Проверьте подключение</p>
                </div>
              </div>
            )}
          </div>

          {/* Калибровка */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Информация о калибровке</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-500 mb-1">Последняя калибровка</p>
                <p className="text-slate-900 font-medium">{selectedSensor.lastCalibration}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-500 mb-1">Следующая калибровка</p>
                <p className="text-slate-900 font-medium">{selectedSensor.nextCalibration}</p>
              </div>
            </div>
            <button className="mt-4 w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
              Запланировать калибровку
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
