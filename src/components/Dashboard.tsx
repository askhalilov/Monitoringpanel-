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
    <div className="space-y-4 md:space-y-6">
      {/* Заголовок */}
      <div className="glass-effect rounded-2xl p-4 md:p-6 shadow-md">
        <h2 className="text-xl md:text-2xl font-bold text-emerald-800">Панель мониторинга</h2>
        <p className="text-emerald-600 mt-1 text-sm md:text-base">Контроль выбросов в реальном времени</p>
      </div>

      {/* Метрики в реальном времени */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
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
              className="glass-effect rounded-xl border border-emerald-100 p-4 md:p-5 shadow-md hover:shadow-lg transition-all card-hover"
            >
              <div className="flex items-start justify-between mb-3 md:mb-4">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-${metric.color}-400 to-${metric.color}-600 flex items-center justify-center shadow-md`}>
                  <Icon className="text-white" size={20} />
                </div>
                {isWarning ? (
                  <span className="flex items-center gap-1 text-xs md:text-sm text-red-600 font-semibold">
                    <TrendingUp size={14} />
                    {percentage.toFixed(0)}%
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs md:text-sm text-emerald-600 font-semibold">
                    <TrendingDown size={14} />
                    {percentage.toFixed(0)}%
                  </span>
                )}
              </div>
              <div>
                <p className="text-xs md:text-sm text-emerald-600 font-medium">{metric.label}</p>
                <p className="text-xl md:text-2xl font-bold text-emerald-800 mt-1">
                  {metric.value} <span className="text-sm md:text-base text-emerald-600">{metric.unit}</span>
                </p>
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-emerald-600 mb-1">
                    <span>ПДК: {metric.limit} {metric.unit}</span>
                  </div>
                  <div className="w-full bg-emerald-100 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        isWarning ? 'bg-gradient-to-r from-red-500 to-red-600' : isSuccess ? 'bg-gradient-to-r from-emerald-500 to-green-600' : 'bg-gradient-to-r from-amber-500 to-amber-600'
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* График выбросов в реальном времени */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-effect rounded-2xl border border-emerald-100 p-4 md:p-6 shadow-md"
        >
          <h3 className="font-bold text-emerald-800 mb-4 text-base md:text-lg">Динамика выбросов (24 часа)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={emissionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
              <XAxis dataKey="time" stroke="#059669" style={{ fontSize: '11px' }} />
              <YAxis stroke="#059669" style={{ fontSize: '11px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #6ee7b7',
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Line type="monotone" dataKey="co2" stroke="#10b981" strokeWidth={2.5} name="CO₂" dot={false} />
              <Line type="monotone" dataKey="so2" stroke="#3b82f6" strokeWidth={2.5} name="SO₂" dot={false} />
              <Line type="monotone" dataKey="nox" stroke="#f59e0b" strokeWidth={2.5} name="NOₓ" dot={false} />
              <Line type="monotone" dataKey="pm25" stroke="#f43f5e" strokeWidth={2.5} name="PM2.5" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* График недельных выбросов */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-effect rounded-2xl border border-emerald-100 p-4 md:p-6 shadow-md"
        >
          <h3 className="font-bold text-emerald-800 mb-4 text-base md:text-lg">Недельные выбросы (кг)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dailyEmissions}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
              <XAxis dataKey="day" stroke="#059669" style={{ fontSize: '11px' }} />
              <YAxis stroke="#059669" style={{ fontSize: '11px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #6ee7b7',
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="value" fill="url(#colorGradient)" name="Фактические" radius={[8, 8, 0, 0]} />
              <Bar dataKey="limit" fill="#d1fae5" name="Лимит" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#34d399" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Статус системы и алерты */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="lg:col-span-2 glass-effect rounded-2xl border border-emerald-100 p-4 md:p-6 shadow-md"
        >
          <h3 className="font-bold text-emerald-800 mb-4 text-base md:text-lg">Статус датчиков</h3>
          <div className="space-y-2 md:space-y-3">
            {[
              { name: 'Датчик CO₂ #1', location: 'Цех А, зона 1', status: 'active', value: '348 мг/м³' },
              { name: 'Датчик SO₂ #2', location: 'Цех Б, зона 3', status: 'active', value: '52 мкг/м³' },
              { name: 'Датчик NOₓ #3', location: 'Выхлопная труба #1', status: 'warning', value: '65 мкг/м³' },
              { name: 'Датчик PM2.5 #4', location: 'Склад материалов', status: 'active', value: '31 мкг/м³' },
              { name: 'Датчик температуры #5', location: 'Цех А, зона 2', status: 'error', value: 'Нет связи' },
            ].map((sensor, i) => (
              <div key={i} className="flex items-center justify-between p-3 md:p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-100 hover:shadow-md transition-all">
                <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                  <div
                    className={`w-2 h-2 md:w-3 md:h-3 rounded-full flex-shrink-0 shadow-lg ${
                      sensor.status === 'active'
                        ? 'bg-emerald-500 animate-pulse-green'
                        : sensor.status === 'warning'
                        ? 'bg-amber-500 animate-pulse'
                        : 'bg-red-500'
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-emerald-800 text-sm md:text-base truncate">{sensor.name}</p>
                    <p className="text-xs md:text-sm text-emerald-600 truncate">{sensor.location}</p>
                  </div>
                </div>
                <span className="text-emerald-700 font-mono text-xs md:text-sm font-semibold ml-2 flex-shrink-0">{sensor.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-effect rounded-2xl border border-emerald-100 p-4 md:p-6 shadow-md"
        >
          <h3 className="font-bold text-emerald-800 mb-4 text-base md:text-lg">Последние события</h3>
          <div className="space-y-3">
            {[
              { type: 'warning', text: 'Превышение NOₓ на 30%', time: '14:23' },
              { type: 'error', text: 'Потеря связи с датчиком #5', time: '13:45' },
              { type: 'success', text: 'Система вернулась в норму', time: '12:18' },
              { type: 'info', text: 'Плановое обслуживание завершено', time: '10:30' },
            ].map((event, i) => (
              <div key={i} className="flex gap-3">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md ${
                    event.type === 'warning'
                      ? 'bg-gradient-to-br from-amber-400 to-amber-600'
                      : event.type === 'error'
                      ? 'bg-gradient-to-br from-red-400 to-red-600'
                      : event.type === 'success'
                      ? 'bg-gradient-to-br from-emerald-400 to-green-600'
                      : 'bg-gradient-to-br from-blue-400 to-blue-600'
                  }`}
                >
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-emerald-800 font-medium">{event.text}</p>
                  <p className="text-xs text-emerald-600 mt-1">{event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}