// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Categories from './pages/Categories';
import Brands from './pages/Brands';
import PurchaseBills from './pages/PurchaseBills';
import Zones from './pages/Zones';
import Beats from './pages/Beats';
import Distributors from './pages/Distributors';
import Salesmen from './pages/Salesmen';
import Retailers from './pages/Retailers';
import Orders from './pages/Orders';
import Reports from './pages/Reports';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

// Context
import { useAuth } from './contexts/AuthContext';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-right" />
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route path="/" element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="categories" element={<Categories />} />
        <Route path="brands" element={<Brands />} />
        <Route path="purchase-bills" element={<PurchaseBills />} />
        <Route path="zones" element={<Zones />} />
        <Route path="beats" element={<Beats />} />
        <Route path="distributors" element={<Distributors />} />
        <Route path="salesmen" element={<Salesmen />} />
        <Route path="retailers" element={<Retailers />} />
        <Route path="orders" element={<Orders />} />
        <Route path="reports" element={<Reports />} />
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default App;