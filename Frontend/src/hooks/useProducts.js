import { useState, useEffect, useCallback } from 'react';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/productService';

/**
 * Custom Hook: useProducts
 * Manages full CRUD state for products including loading, error, and toast feedback.
 */
export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null); // { type: 'success'|'error', message: string }

  // ─── Show Toast ──────────────────────────────────────────────────────────────
  const showToast = useCallback((type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3500);
  }, []);

  // ─── Fetch All Products ───────────────────────────────────────────────────────
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'ดึงข้อมูลสินค้าล้มเหลว';
      setError(msg);
      showToast('error', msg);
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // ─── Create Product ───────────────────────────────────────────────────────────
  const addProduct = useCallback(
    async (payload) => {
      setSubmitting(true);
      try {
        const newProduct = await createProduct(payload);
        setProducts((prev) => [...prev, newProduct]);
        showToast('success', `เพิ่มสินค้า "${newProduct.name}" สำเร็จ`);
        return true;
      } catch (err) {
        const msg = err.response?.data?.message || err.message || 'เพิ่มสินค้าล้มเหลว';
        showToast('error', msg);
        return false;
      } finally {
        setSubmitting(false);
      }
    },
    [showToast]
  );

  // ─── Update Product ───────────────────────────────────────────────────────────
  const editProduct = useCallback(
    async (id, payload) => {
      setSubmitting(true);
      try {
        const updated = await updateProduct(id, payload);
        setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
        showToast('success', `อัปเดตสินค้า "${updated.name}" สำเร็จ`);
        return true;
      } catch (err) {
        const msg = err.response?.data?.message || err.message || 'อัปเดตสินค้าล้มเหลว';
        showToast('error', msg);
        return false;
      } finally {
        setSubmitting(false);
      }
    },
    [showToast]
  );

  // ─── Delete Product ───────────────────────────────────────────────────────────
  const removeProduct = useCallback(
    async (id) => {
      setSubmitting(true);
      try {
        await deleteProduct(id);
        setProducts((prev) => prev.filter((p) => p.id !== id));
        showToast('success', 'ลบสินค้าสำเร็จ');
        return true;
      } catch (err) {
        const msg = err.response?.data?.message || err.message || 'ลบสินค้าล้มเหลว';
        showToast('error', msg);
        return false;
      } finally {
        setSubmitting(false);
      }
    },
    [showToast]
  );

  return {
    products,
    loading,
    submitting,
    error,
    toast,
    fetchProducts,
    addProduct,
    editProduct,
    removeProduct,
  };
}
