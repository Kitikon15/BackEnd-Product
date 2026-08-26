import { useState } from 'react';
import { Plus, Pencil, Trash2, Package, RefreshCw, X, Check } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import Toast from '../components/common/Toast';
import ConfirmModal from '../components/common/ConfirmModal';

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatPrice = (price) =>
    Number(price).toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const INITIAL_FORM = { name: '', price: '' };

// ─── ProductForm Component ────────────────────────────────────────────────────
function ProductForm({ form, setForm, onSubmit, onCancel, editingId, submitting }) {
    const isEditing = !!editingId;
    const isValid = form.name.trim() !== '' && form.price !== '' && Number(form.price) >= 0;

    return (
        <div className="bg-white/95 backdrop-blur-2xl  rounded-2xl sm:rounded-3xl shadow-2xl border border-white/60 p-5 sm:p-7">
            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-sm
          ${isEditing ? 'bg-amber-50 border border-amber-200' : 'bg-black'}`}>
                    {isEditing
                        ? <Pencil size={16} className="text-amber-600" />
                        : <Plus size={16} className="text-white" />
                    }
                </div>
                <div>
                    <h2 className="text-base font-['Kanit'] font-bold text-gray-900 leading-tight">
                        {isEditing ? 'แก้ไขสินค้า' : 'เพิ่มสินค้าใหม่'}
                    </h2>
                    <p className="font-['Kanit'] text-xs text-gray-400">
                        {isEditing ? `กำลังแก้ไข ID #${editingId}` : 'กรอกข้อมูลสินค้าที่ต้องการเพิ่ม'}
                    </p>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={onSubmit} className="flex flex-col gap-4" id="product-form">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="product-name" className="text-xs font-semibold uppercase tracking-wider text-gray-700">
                        ชื่อสินค้า <span className="text-red-400">*</span>
                    </label>
                    <input
                        id="product-name"
                        type="text"
                        placeholder="เช่น iPhone 15 Pro"
                        value={form.name}
                        maxLength={100}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        className="text-sm px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white/50 focus:bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all shadow-sm"
                        required
                    />
                </div>

                {/* Price */}
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="product-price" className="text-xs font-semibold uppercase tracking-wider text-gray-700">
                        ราคา (฿) <span className="text-red-400">*</span>
                    </label>
                    <input
                        id="product-price"
                        type="number"
                        placeholder="0.00"
                        value={form.price}
                        min="0"
                        step="0.01"
                        onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                        className="text-sm px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white/50 focus:bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all shadow-sm"
                        required
                    />
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-1">
                    <button
                        type="submit"
                        form="product-form"
                        disabled={submitting || !isValid}
                        className={`flex-1 text-sm font-semibold py-3 rounded-xl active:scale-[0.99] transition-all shadow-md
              disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2
              ${isEditing
                                ? 'bg-amber-500 text-white hover:bg-amber-600'
                                : 'bg-black text-white hover:bg-neutral-800'
                            }`}
                    >
                        {submitting ? (
                            <>
                                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                {isEditing ? 'กำลังบันทึก...' : 'กำลังเพิ่ม...'}
                            </>
                        ) : (
                            <>
                                {isEditing ? <Check size={15} /> : <Plus size={15} />}
                                {isEditing ? 'บันทึกการแก้ไข' : 'เพิ่มสินค้า'}
                            </>
                        )}
                    </button>
                    {isEditing && (
                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={submitting}
                            className="px-4 py-3 text-sm font-medium rounded-xl border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 active:scale-[0.98] transition-all disabled:opacity-50"
                        >
                            <X size={15} />
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

// ─── ProductList Component ────────────────────────────────────────────────────
function ProductList({ products, loading, editingId, onEdit, onDelete }) {
    if (loading) {
        return (
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 flex flex-col items-center gap-3">
                <span className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <p className="text-sm text-white/60">กำลังโหลดข้อมูล...</p>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-10 flex flex-col items-center gap-3 text-center">
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                    <Package size={24} className="text-white/40" />
                </div>
                <p className="text-sm font-medium text-white/50">ยังไม่มีสินค้าในระบบ</p>
                <p className="text-xs text-white/30">เพิ่มสินค้าแรกของคุณผ่านฟอร์มด้านบน</p>
            </div>
        );
    }

    return (
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden">
            {/* Header */}
            <div className="px-5 py-3 border-b border-white/10 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-white/50">
                    รายการสินค้า
                </span>
                <span className="text-xs font-medium text-white/40 bg-white/10 px-2.5 py-1 rounded-full">
                    {products.length} รายการ
                </span>
            </div>

            {/* Items */}
            <ul className="divide-y divide-white/10">
                {products.map((item, index) => {
                    const isEditing = editingId === item.id;
                    return (
                        <li
                            key={item.id}
                            className={`flex items-center justify-between px-5 py-4 gap-4 transition-colors
                ${isEditing ? 'bg-amber-400/10 border-l-2 border-amber-400' : 'hover:bg-white/5'}`}
                        >
                            {/* Left: Info */}
                            <div className="flex items-center gap-3 min-w-0">
                                <span className="text-xs font-mono text-white/20 w-6 shrink-0">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-white truncate">{item.name}</p>
                                    <p className="text-xs text-white/40">ID #{item.id}</p>
                                </div>
                            </div>

                            {/* Right: Price + Actions */}
                            <div className="flex items-center gap-3 shrink-0">
                                <span className="text-sm font-bold text-white/80 tabular-nums">
                                    ฿{formatPrice(item.price)}
                                </span>
                                <div className="flex gap-1.5">
                                    <button
                                        id={`edit-btn-${item.id}`}
                                        type="button"
                                        onClick={() => onEdit(item)}
                                        title="แก้ไข"
                                        className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all active:scale-95
                      ${isEditing
                                                ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                                                : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white border border-transparent'
                                            }`}
                                    >
                                        <Pencil size={13} />
                                    </button>
                                    <button
                                        id={`delete-btn-${item.id}`}
                                        type="button"
                                        onClick={() => onDelete(item)}
                                        title="ลบ"
                                        className="w-8 h-8 rounded-xl flex items-center justify-center bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 border border-transparent hover:border-red-400/20 transition-all active:scale-95"
                                    >
                                        <Trash2 size={13} />
                                    </button>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

// ─── Main ProductPage ─────────────────────────────────────────────────────────
export default function ProductPage() {
    const { products, loading, submitting, toast, fetchProducts, addProduct, editProduct, removeProduct } = useProducts();

    const [form, setForm] = useState(INITIAL_FORM);
    const [editingId, setEditingId] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null); // { id, name }

    // ─── Start editing ──────────────────────────────────────────────────────────
    const handleEdit = (product) => {
        setEditingId(product.id);
        setForm({ name: product.name, price: String(product.price) });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setForm(INITIAL_FORM);
    };

    // ─── Submit (Create / Update) ───────────────────────────────────────────────
    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { name: form.name.trim(), price: parseFloat(form.price) };

        let ok;
        if (editingId) {
            ok = await editProduct(editingId, payload);
        } else {
            ok = await addProduct(payload);
        }
        if (ok) {
            setEditingId(null);
            setForm(INITIAL_FORM);
        }
    };

    // ─── Delete flow ────────────────────────────────────────────────────────────
    const handleDeleteClick = (item) => setDeleteTarget({ id: item.id, name: item.name });
    const handleConfirmDelete = async () => {
        if (!deleteTarget) return;
        const ok = await removeProduct(deleteTarget.id);
        if (ok) setDeleteTarget(null);
    };

    return (
        <div className="min-h-screen bg-neutral-950 p-3 sm:p-4 md:p-6 flex items-start justify-center font-sans antialiased relative overflow-hidden">
            {/* ─── Video Background ─── */}
            <video
                className="absolute inset-0 w-full h-full object-cover"
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260602_150901_c45b90ec-18d7-42ff-90e2-b95d7109e330.mp4"
                autoPlay
                muted
                loop
                playsInline
            />
            {/* ─── Gradient Overlay ─── */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40 pointer-events-none z-0" />

            {/* ─── Main Glass Card ─── */}
            <div className="relative w-full max-w-5xl rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-white/5 backdrop-blur-xl min-h-[calc(100vh-24px)] sm:min-h-[calc(100vh-32px)] md:min-h-[calc(100vh-48px)] p-4 sm:p-6 md:p-10 flex flex-col gap-6">

                {/* ─── Header ─── */}
                <div className="flex items-center justify-between flex-wrap gap-3">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-medium text-white tracking-tight leading-tight drop-shadow-md">
                            Product{' '}
                            <span
                                style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 400 }}
                                className="text-white drop-shadow-lg"
                            >
                                Management
                            </span>
                        </h1>
                        <p className="text-sm text-white/40 mt-1">จัดการข้อมูลสินค้าในระบบ</p>
                    </div>
                    <button
                        id="refresh-btn"
                        type="button"
                        onClick={fetchProducts}
                        disabled={loading}
                        title="รีเฟรชข้อมูล"
                        className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all active:scale-95 disabled:opacity-50"
                    >
                        <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                    </button>
                </div>

                {/* ─── Content Grid ─── */}
                <div className="flex flex-col lg:flex-row gap-6 flex-1">
                    {/* Left: Form */}
                    <div className="w-full lg:w-80 xl:w-96 shrink-0">
                        <ProductForm
                            form={form}
                            setForm={setForm}
                            onSubmit={handleSubmit}
                            onCancel={handleCancelEdit}
                            editingId={editingId}
                            submitting={submitting}
                        />

                        {/* Stats card */}
                        <div className="mt-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 px-5 py-4 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                                <Package size={18} className="text-white/60" />
                            </div>
                            <div>
                                <p className="text-xs text-white/40 font-medium">สินค้าทั้งหมด</p>
                                <p className="text-2xl font-bold text-white tabular-nums">{products.length}</p>
                            </div>
                            {products.length > 0 && (
                                <div className="ml-auto text-right">
                                    <p className="text-xs text-white/40 font-medium">มูลค่ารวม</p>
                                    <p className="text-sm font-bold text-white/80">
                                        ฿{formatPrice(products.reduce((s, p) => s + Number(p.price), 0))}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: Product List */}
                    <div className="flex-1 min-w-0">
                        <ProductList
                            products={products}
                            loading={loading}
                            editingId={editingId}
                            onEdit={handleEdit}
                            onDelete={handleDeleteClick}
                        />
                    </div>
                </div>
            </div>

            {/* ─── Toast ─── */}
            <Toast toast={toast} />

            {/* ─── Confirm Delete Modal ─── */}
            <ConfirmModal
                isOpen={!!deleteTarget}
                productName={deleteTarget?.name || ''}
                onConfirm={handleConfirmDelete}
                onCancel={() => setDeleteTarget(null)}
                loading={submitting}
            />
        </div>
    );
}