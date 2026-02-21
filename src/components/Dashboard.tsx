import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Wind, Droplets, Thermometer, AlertCircle } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'motion/react';

// Mock данные для графиков
const generateEmissionData = () => {
  const now = new Date();
  return Array.from({ length: 24 }, (_, i) => {
    const hour = new Date(now.getTime() - (23 - i) * 3600000);
    return {
      time: `${hour.getHours()}:00`,
      co2: 320 + Math.random() * 80,
      so2: 45 + Math.random() * 25,
      nox: 38 + Math.random() * 20,
      pm25: 28 + Math.random() * 15,
    };
  });
};

const dailyEmissions = Array.from({ length: 7 }, (_, i) => ({
  day: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'][i],
  value: 2500 + Math.random() * 1000,
  limit: 3500,
}));

export function Dashboard() {
  const [emissionData, setEmissionData] = useState(generateEmissionData());
  const [currentValues, setCurrentValues] = useState({
    co2: 352,
    so2: 58,
    nox: 42,
    pm25: 35,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setEmissionData(generateEmissionData());
      setCurrentValues({
        co2: 320 + Math.random() * 80,
        so2: 45 + Math.random() * 25,
        nox: 38 + Math.random() * 20,
        pm25: 28 + Math.random() * 15,
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const metrics = [
    {
      label: 'CO₂',
      value: currentValues.co2.toFixed(1),
      unit: 'мг/м³',
      limit: 400,
      icon: Wind,
      color: 'emerald',
    },
    {
      label: 'SO₂',
      value: currentValues.so2.toFixed(1),
      unit: 'мкг/м³',
      limit: 70,
      icon: Droplets,
      color: 'blue',
    },
    {
      label: 'NOₓ',
      value: currentValues.nox.toFixed(1),
      unit: 'мкг/м³',
      limit: 50,
      icon: Thermometer,
      color: 'amber',
    },
    {
      label: 'PM2.5',
      value: currentValues.pm25.toFixed(1),
      unit: 'мкг/м³',
      limit: 45,
      icon: AlertCircle,
      color: 'rose',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Панель мониторинга</h2>
        <p className="text-slate-500 mt-1">Контроль выбросов в реальном времени</p>
      </div>

      {/* Метрики в реальном времени */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const percentage = (parseFloat(metric.value) / metric.limit) * 100;
          const isWarning = percentage > 80;
          const isSuccess = percentage < 60;

          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg border border-slate-200 p-5"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-lg bg-${metric.color}-50 flex items-center justify-center`}>
                  <Icon className={`text-${metric.color}-600`} size={20} />
                </div>
                {isWarning ? (
                  <span className="flex items-center gap-1 text-sm text-red-600">
                    <TrendingUp size={16} />
                    {percentage.toFixed(0)}%
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-sm text-emerald-600">
                    <TrendingDown size={16} />
                    {percentage.toFixed(0)}%
                  </span>
                )}
              </div>
              <div>
                <p className="text-sm text-slate-500">{metric.label}</p>
                <p className="text-2xl font-semibold text-slate-900 mt-1">
                  {metric.value} <span className="text-base text-slate-500">{metric.unit}</span>
                </p>
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>ПДК: {metric.limit} {metric.unit}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        isWarning ? 'bg-red-500' : isSuccess ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Графики */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* График выбросов в реальном времени */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg border border-slate-200 p-6"
        >
          <h3 className="font-semibold text-slate-900 mb-4">Динамика выбросов (24 часа)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={emissionData}>
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
              <Legend />
              <Line type="monotone" dataKey="co2" stroke="#10b981" strokeWidth={2} name="CO₂" />
              <Line type="monotone" dataKey="so2" stroke="#3b82f6" strokeWidth={2} name="SO₂" />
              <Line type="monotone" dataKey="nox" stroke="#f59e0b" strokeWidth={2} name="NOₓ" />
              <Line type="monotone" dataKey="pm25" stroke="#f43f5e" strokeWidth={2} name="PM2.5" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* График недельных выбросов */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-lg border border-slate-200 p-6"
        >
          <h3 className="font-semibold text-slate-900 mb-4">Недельные выбросы (кг)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyEmissions}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" stroke="#64748b" style={{ fontSize: '12px' }} />
              <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="value" fill="#10b981" name="Фактические" radius={[8, 8, 0, 0]} />
              <Bar dataKey="limit" fill="#e2e8f0" name="Лимит" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Статус системы и алерты */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="lg:col-span-2 bg-white rounded-lg border border-slate-200 p-6"
        >
          <h3 className="font-semibold text-slate-900 mb-4">Статус датчиков</h3>
          <div className="space-y-3">
            {[
              { name: 'Датчик CO₂ #1', location: 'Цех А, зона 1', status: 'active', value: '348 мг/м³' },
              { name: 'Датчик SO₂ #2', location: 'Цех Б, зона 3', status: 'active', value: '52 мкг/м³' },
              { name: 'Датчик NOₓ #3', location: 'Выхлопная труба #1', status: 'warning', value: '65 мкг/м³' },
              { name: 'Датчик PM2.5 #4', location: 'Склад материалов', status: 'active', value: '31 мкг/м³' },
              { name: 'Датчик температуры #5', location: 'Цех А, зона 2', status: 'error', value: 'Нет связи' },
            ].map((sensor, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      sensor.status === 'active'
                        ? 'bg-emerald-500'
                        : sensor.status === 'warning'
                        ? 'bg-amber-500'
                        : 'bg-red-500'
                    }`}
                  />
                  <div>
                    <p className="font-medium text-slate-900">{sensor.name}</p>
                    <p className="text-sm text-slate-500">{sensor.location}</p>
                  </div>
                </div>
                <span className="text-slate-700 font-mono">{sensor.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-lg border border-slate-200 p-6"
        >
          <h3 className="font-semibold text-slate-900 mb-4">Последние события</h3>
          <div className="space-y-3">
            {[
              { type: 'warning', text: 'Превышение NOₓ на 30%', time: '14:23' },
              { type: 'error', text: 'Потеря связи с датчиком #5', time: '13:45' },
              { type: 'success', text: 'Система вернулась в норму', time: '12:18' },
              { type: 'info', text: 'Плановое обслуживание завершено', time: '10:30' },
            ].map((event, i) => (
              <div key={i} className="flex gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    event.type === 'warning'
                      ? 'bg-amber-100'
                      : event.type === 'error'
                      ? 'bg-red-100'
                      : event.type === 'success'
                      ? 'bg-emerald-100'
                      : 'bg-blue-100'
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      event.type === 'warning'
                        ? 'bg-amber-600'
                        : event.type === 'error'
                        ? 'bg-red-600'
                        : event.type === 'success'
                        ? 'bg-emerald-600'
                        : 'bg-blue-600'
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-900">{event.text}</p>
                  <p className="text-xs text-slate-500 mt-1">{event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
