import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

/**
 * Toast Notification Component
 * @param {{ toast: { type: 'success'|'error', message: string } | null }} props
 */
export default function Toast({ toast }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (toast) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [toast]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success';

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl border backdrop-blur-xl transition-all duration-300 max-w-sm
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        ${isSuccess
          ? 'bg-emerald-50/95 border-emerald-200 text-emerald-800'
          : 'bg-red-50/95 border-red-200 text-red-800'
        }`}
    >
      {isSuccess
        ? <CheckCircle size={20} className="text-emerald-500 shrink-0" />
        : <XCircle size={20} className="text-red-500 shrink-0" />
      }
      <p className="text-sm font-medium leading-snug">{toast.message}</p>
      <button
        onClick={() => setVisible(false)}
        className="ml-auto text-current opacity-40 hover:opacity-70 transition-opacity"
        aria-label="ปิด"
      >
        <X size={16} />
      </button>
    </div>
  );
}
