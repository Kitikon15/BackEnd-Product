import { Routes, Route } from 'react-router-dom'
import App from '../App.jsx'
import ProductPage from '../pages/ProductPage'

export default function AppRoutes() {
    return (
        <Routes>
            {/* หน้า Landing Page */}
            <Route path="/" element={<App />} />

            {/* หน้าจัดการสินค้า */}
            <Route path="/products" element={<ProductPage />} />

            {/* สามารถเพิ่มหน้าอื่นๆ ได้ตรงนี้ */}
        </Routes>
    )
}