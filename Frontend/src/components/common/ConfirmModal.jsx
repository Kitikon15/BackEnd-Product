import { AlertTriangle } from 'lucide-react';

/**
 * Confirm Delete Modal Component
 * @param {{ isOpen: boolean, productName: string, onConfirm: ()=>void, onCancel: ()=>void, loading: boolean }} props
 */
export default function ConfirmModal({ isOpen, productName, onConfirm, onCancel, loading }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Dialog */}
      <div className="relative bg-white rounded-2xl shadow-2xl border border-white/60 p-6 w-full max-w-sm flex flex-col gap-5 animate-fade-in">
        {/* Icon */}
        <div className="w-12 h-12 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mx-auto">
          <AlertTriangle size={22} className="text-red-500" />
        </div>

        {/* Text */}
        <div className="text-center">
          <h2 id="confirm-modal-title" className="text-lg font-bold text-gray-900 mb-1">
            ยืนยันการลบสินค้า
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            คุณต้องการลบ{' '}
            <span className="font-semibold text-gray-800">"{productName}"</span>{' '}
            ออกจากระบบ? การกระทำนี้ไม่สามารถย้อนกลับได้
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="flex-1 text-sm font-medium px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 active:scale-[0.98] transition-all disabled:opacity-50"
          >
            ยกเลิก
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 text-sm font-semibold px-4 py-2.5 rounded-xl bg-red-500 text-white hover:bg-red-600 active:scale-[0.98] transition-all shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                กำลังลบ...
              </>
            ) : (
              'ยืนยันการลบ'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
