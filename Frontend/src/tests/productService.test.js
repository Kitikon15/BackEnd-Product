import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/productService';

// ─── Mock axios ───────────────────────────────────────────────────────────────
vi.mock('axios');

const mockProducts = [
  { id: 1, name: 'iPhone 15 Pro', price: 43900 },
  { id: 2, name: 'MacBook Air M3', price: 49900 },
];

describe('productService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ─── GET /products ──────────────────────────────────────────────────────────
  describe('getProducts', () => {
    it('should return list of products on success', async () => {
      axios.get.mockResolvedValue({ data: mockProducts });
      const result = await getProducts();
      expect(result).toEqual(mockProducts);
      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/products'));
    });

    it('should throw when API returns error', async () => {
      axios.get.mockRejectedValue(new Error('Network Error'));
      await expect(getProducts()).rejects.toThrow('Network Error');
    });
  });

  // ─── GET /products/:id ──────────────────────────────────────────────────────
  describe('getProduct', () => {
    it('should return single product by id', async () => {
      axios.get.mockResolvedValue({ data: mockProducts[0] });
      const result = await getProduct(1);
      expect(result).toEqual(mockProducts[0]);
      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/products/1'));
    });
  });

  // ─── POST /products ─────────────────────────────────────────────────────────
  describe('createProduct', () => {
    it('should create and return new product', async () => {
      const payload = { name: 'AirPods Pro', price: 9990 };
      const created = { id: 3, ...payload };
      axios.post.mockResolvedValue({ data: created });

      const result = await createProduct(payload);
      expect(result).toEqual(created);
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining('/products'),
        payload
      );
    });

    it('should throw when required fields are missing', async () => {
      axios.post.mockRejectedValue({ response: { data: { message: 'name and price are required' } } });
      await expect(createProduct({})).rejects.toMatchObject({
        response: { data: { message: 'name and price are required' } },
      });
    });
  });

  // ─── PUT /products/:id ──────────────────────────────────────────────────────
  describe('updateProduct', () => {
    it('should update and return product', async () => {
      const updates = { name: 'iPhone 15', price: 39900 };
      const updated = { id: 1, ...updates };
      axios.put.mockResolvedValue({ data: updated });

      const result = await updateProduct(1, updates);
      expect(result).toEqual(updated);
      expect(axios.put).toHaveBeenCalledWith(
        expect.stringContaining('/products/1'),
        updates
      );
    });

    it('should throw when product not found (404)', async () => {
      axios.put.mockRejectedValue({ response: { status: 404, data: { message: 'Product not found' } } });
      await expect(updateProduct(999, { name: 'X' })).rejects.toMatchObject({
        response: { status: 404 },
      });
    });
  });

  // ─── DELETE /products/:id ───────────────────────────────────────────────────
  describe('deleteProduct', () => {
    it('should call delete endpoint and resolve', async () => {
      axios.delete.mockResolvedValue({ status: 204 });
      await expect(deleteProduct(1)).resolves.toBeUndefined();
      expect(axios.delete).toHaveBeenCalledWith(expect.stringContaining('/products/1'));
    });

    it('should throw when product not found (404)', async () => {
      axios.delete.mockRejectedValue({ response: { status: 404, data: { message: 'Product not found' } } });
      await expect(deleteProduct(999)).rejects.toMatchObject({
        response: { status: 404 },
      });
    });
  });
});
