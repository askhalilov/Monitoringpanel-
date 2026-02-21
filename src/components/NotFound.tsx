import { AlertCircle } from 'lucide-react';
import { Link } from 'react-router';

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <AlertCircle className="text-slate-400 mb-4" size={64} />
      <h2 className="text-2xl font-semibold text-slate-900 mb-2">Страница не найдена</h2>
      <p className="text-slate-500 mb-6">Запрашиваемая страница не существует</p>
      <Link
        to="/"
        className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
      >
        Вернуться на главную
      </Link>
    </div>
  );
}
