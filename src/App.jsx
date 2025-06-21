import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx';
import OrderHistoryPage from './pages/OrderHistoryPage';
import SellerOrdersPage from './pages/SellerOrdersPage';
import CartPage from './pages/CartPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminOrdersPage from './pages/AdminOrdersPage';
import AdminLoginPage from './pages/AdminLoginPage';
import BuyerDashboard from './pages/BuyerDashboard';
import SellerDashboard from './pages/SellerDashboard';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/orders" element={<AdminOrdersPage />} />
          <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
          <Route path="/buyer/orders" element={<OrderHistoryPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/seller/orders" element={<SellerOrdersPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
