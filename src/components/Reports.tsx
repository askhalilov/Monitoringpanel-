import { FileText, Download, Calendar, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

const reportsData = [
  {
    id: 1,
    title: 'Отчет по выбросам за январь 2026',
    type: 'Ежемесячный',
    date: '31.01.2026',
    status: 'completed',
    size: '2.4 МБ',
  },
  {
    id: 2,
    title: 'Отчет по качеству воздуха',
    type: 'Еженедельный',
    date: '10.02.2026',
    status: 'completed',
    size: '1.8 МБ',
  },
  {
    id: 3,
    title: 'Отчет об оборудовании',
    type: 'Квартальный',
    date: '31.12.2025',
    status: 'completed',
    size: '5.2 МБ',
  },
  {
    id: 4,
    title: 'Отчет по калибровке датчиков',
    type: 'Ежемесячный',
    date: '31.01.2026',
    status: 'completed',
    size: '1.2 МБ',
  },
  {
    id: 5,
    title: 'Отчет о превышениях ПДК',
    type: 'Внеплановый',
    date: '12.02.2026',
    status: 'warning',
    size: '856 КБ',
  },
  {
    id: 6,
    title: 'Годовой экологический отчет 2025',
    type: 'Годовой',
    date: '15.01.2026',
    status: 'completed',
    size: '12.8 МБ',
  },
];

const complianceData = [
  {
    parameter: 'CO₂',
    current: 352,
    limit: 400,
    unit: 'мг/м³',
    status: 'good',
  },
  {
    parameter: 'SO₂',
    current: 58,
    limit: 70,
    unit: 'мкг/м³',
    status: 'good',
  },
  {
    parameter: 'NOₓ',
    current: 65,
    limit: 50,
    unit: 'мкг/м³',
    status: 'exceeded',
  },
  {
    parameter: 'PM2.5',
    current: 35,
    limit: 45,
    unit: 'мкг/м³',
    status: 'good',
  },
  {
    parameter: 'PM10',
    current: 68,
    limit: 80,
    unit: 'мкг/м³',
    status: 'warning',
  },
];

export function Reports() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <div className="flex items-center gap-1 text-emerald-700">
            <CheckCircle size={16} />
            <span className="text-sm">Готов</span>
          </div>
        );
      case 'warning':
        return (
          <div className="flex items-center gap-1 text-amber-700">
            <AlertTriangle size={16} />
            <span className="text-sm">Требует внимания</span>
          </div>
        );
      default:
        return null;
    }
  };

  const getComplianceStatus = (status: string) => {
    switch (status) {
      case 'good':
        return 'bg-emerald-500';
      case 'warning':
        return 'bg-amber-500';
      case 'exceeded':
        return 'bg-red-500';
      default:
        return 'bg-slate-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Отчеты и аналитика</h2>
        <p className="text-slate-500 mt-1">Формирование и экспорт отчетов по экологическому мониторингу</p>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <FileText className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Всего отчетов</p>
              <p className="text-2xl font-semibold text-slate-900">{reportsData.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
              <CheckCircle className="text-emerald-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Готовы к экспорту</p>
              <p className="text-2xl font-semibold text-slate-900">
                {reportsData.filter((r) => r.status === 'completed').length}
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
              <p className="text-sm text-slate-500">Требуют внимания</p>
              <p className="text-2xl font-semibold text-slate-900">
                {reportsData.filter((r) => r.status === 'warning').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Список отчетов */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-slate-900">Сформированные отчеты</h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
              <FileText size={18} />
              Создать отчет
            </button>
          </div>

          <div className="space-y-3">
            {reportsData.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="text-blue-600" size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{report.title}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {report.date}
                      </span>
                      <span>{report.type}</span>
                      <span>{report.size}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(report.status)}
                  <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <Download className="text-slate-600" size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Создание отчета */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Быстрое создание</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                <p className="font-medium text-slate-900">Ежедневный отчет</p>
                <p className="text-sm text-slate-500 mt-1">Выбросы за текущие сутки</p>
              </button>
              <button className="w-full text-left p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                <p className="font-medium text-slate-900">Еженедельный отчет</p>
                <p className="text-sm text-slate-500 mt-1">Сводка за неделю</p>
              </button>
              <button className="w-full text-left p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                <p className="font-medium text-slate-900">Ежемесячный отчет</p>
                <p className="text-sm text-slate-500 mt-1">Детальная статистика</p>
              </button>
              <button className="w-full text-left p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                <p className="font-medium text-slate-900">Произвольный период</p>
                <p className="text-sm text-slate-500 mt-1">Настраиваемый отчет</p>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Форматы экспорта</h3>
            <div className="space-y-2">
              {['PDF документ', 'Excel таблица', 'CSV файл', 'JSON данные'].map((format) => (
                <div key={format} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <span className="text-slate-700">{format}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Соответствие нормам */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="text-slate-600" size={20} />
          <h3 className="font-semibold text-slate-900">Соответствие предельно допустимым концентрациям (ПДК)</h3>
        </div>

        <div className="space-y-4">
          {complianceData.map((item) => {
            const percentage = (item.current / item.limit) * 100;
            const statusColor = getComplianceStatus(item.status);

            return (
              <div key={item.parameter} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${statusColor}`} />
                    <span className="font-medium text-slate-900">{item.parameter}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-slate-600">
                      {item.current} / {item.limit} {item.unit}
                    </span>
                    <span
                      className={`font-medium ${
                        item.status === 'exceeded'
                          ? 'text-red-600'
                          : item.status === 'warning'
                          ? 'text-amber-600'
                          : 'text-emerald-600'
                      }`}
                    >
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${statusColor}`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-slate-50 rounded-lg">
          <p className="text-sm text-slate-600">
            <span className="font-medium">Общий статус соответствия:</span> Обнаружено{' '}
            {complianceData.filter((i) => i.status === 'exceeded').length} превышение нормативов.
            Требуется принятие мер по снижению выбросов NOₓ.
          </p>
        </div>
      </div>
    </div>
  );
}
