import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import './assets/tailwind.css';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import GuestLayout from './layouts/GuestLayout';
import MemberLayout from './layouts/MemberLayout';
import Loading from './components/Loading';

// Main Admin Pages
import Dashboard from './pages/main/Dashboard';
import Orders from './pages/main/Orders';
import Customers from './pages/main/Customers';
import CustomerDetail from './pages/main/CustomerDetail';
import Components from './pages/main/Components';
import Notes from './pages/main/Notes';
import ErrorPage from './pages/main/ErrorPage';
import MedicineGroups from './pages/main/MedicineGroups';
import SalesReport from './pages/main/SalesReport';
import PharmacyReport from './pages/main/PharmacyReport';
import ConfigPage from './pages/main/ConfigPage';
import NotificationsPage from './pages/main/NotificationsPage';
import ChatPage from './pages/main/ChatPage';
import SettingsPage from './pages/main/SettingsPage';
import CovidPage from './pages/main/CovidPage';
import Members from './pages/main/Members';
import MemberDetail from './pages/main/MemberDetail';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Forgot from './pages/auth/Forgot';

// Guest Pages
import Home from './pages/guest/Home';
import About from './pages/guest/About';
import FAQ from './pages/guest/FAQ';
import Contact from './pages/guest/Contact';

// Member Pages
import MemberDashboard from './pages/member/MemberDashboard';
import MemberProfile from './pages/member/MemberProfile';
import MemberOrders from './pages/member/MemberOrders';
import MemberSettings from './pages/member/MemberSettings';

// Lazy Loaded Components
const Products = React.lazy(() => import("./pages/main/Products"));
const ProductDetail = React.lazy(() => import("./pages/main/ProductDetail"));
const Medicines = React.lazy(() => import("./pages/main/Medicines"));
const MedicineDetail = React.lazy(() => import("./pages/main/MedicineDetail"));
const Suppliers = React.lazy(() => import("./pages/main/Suppliers"));
const SupplierDetail = React.lazy(() => import("./pages/main/SupplierDetail"));

// Protected Route Component
function ProtectedRoute({ children, requiredRole }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userProfile = JSON.parse(localStorage.getItem("userProfile") || '{"role": "Member"}');

  if (!isLoggedIn) {
    return <Navigate to="/home" replace />;
  }

  if (requiredRole === "Super Admin" && userProfile.role !== "Super Admin") {
    return <Navigate to="/member/dashboard" replace />;
  }

  if (requiredRole === "Member" && userProfile.role === "Super Admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Guest Routes (Tidak Perlu Login) */}
        <Route element={<GuestLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Auth Routes (Login/Register/Forgot) */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        {/* Member Routes (Butuh Login, Role: Member) */}
        <Route element={<ProtectedRoute requiredRole="Member"><MemberLayout /></ProtectedRoute>}>
          <Route path="/member/dashboard" element={<MemberDashboard />} />
          <Route path="/member/profile" element={<MemberProfile />} />
          <Route path="/member/orders" element={<MemberOrders />} />
          <Route path="/member/settings" element={<MemberSettings />} />
        </Route>

        {/* Admin Routes (Butuh Login, Role: Super Admin) */}
        <Route element={<ProtectedRoute requiredRole="Super Admin"><MainLayout /></ProtectedRoute>}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/:id" element={<CustomerDetail />} />
          <Route path="/members" element={<Members />} />
          <Route path="/members/:id" element={<MemberDetail />} />
          <Route path="/medicines" element={<Medicines />} />
          <Route path="/medicines/:id" element={<MedicineDetail />} />
          <Route path="/medicine-groups" element={<MedicineGroups />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/suppliers/:id" element={<SupplierDetail />} />
          <Route path="/components" element={<Components />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/reports/sales" element={<SalesReport />} />
          <Route path="/reports/pharmacy" element={<PharmacyReport />} />
          <Route path="/config" element={<ConfigPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/covid-19" element={<CovidPage />} />
        </Route>

        {/* Catch All Route - Redirect ke Home */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
