import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = `${BASE_URL}/products`;

/**
 * Fetch all products
 * @returns {Promise<Array>} List of products
 */
export const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

/**
 * Fetch a single product by ID
 * @param {number} id
 * @returns {Promise<Object>} Product object
 */
export const getProduct = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

/**
 * Create a new product
 * @param {{ name: string, price: number }} payload
 * @returns {Promise<Object>} Created product
 */
export const createProduct = async (payload) => {
  const response = await axios.post(API_URL, payload);
  return response.data;
};

/**
 * Update an existing product by ID
 * @param {number} id
 * @param {{ name?: string, price?: number }} payload
 * @returns {Promise<Object>} Updated product
 */
export const updateProduct = async (id, payload) => {
  const response = await axios.put(`${API_URL}/${id}`, payload);
  return response.data;
};

/**
 * Delete a product by ID
 * @param {number} id
 * @returns {Promise<void>}
 */
export const deleteProduct = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
