import React, { Suspense } from 'react';
import { Routes, Route } from "react-router-dom";
import './assets/tailwind.css';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import Loading from './components/Loading';
import Dashboard from './pages/main/Dashboard';
import Orders from './pages/main/Orders';
import Customers from './pages/main/Customers';
import CustomerDetail from './pages/main/CustomerDetail';
import Components from './pages/main/Components';
import FiturXyz from './pages/main/FiturXyz';
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
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Forgot from './pages/auth/Forgot';

const Products = React.lazy(() => import("./pages/main/Products"));
const ProductDetail = React.lazy(() => import("./pages/main/ProductDetail"));
const Medicines = React.lazy(() => import("./pages/main/Medicines"));
const MedicineDetail = React.lazy(() => import("./pages/main/MedicineDetail"));
const Suppliers = React.lazy(() => import("./pages/main/Suppliers"));
const SupplierDetail = React.lazy(() => import("./pages/main/SupplierDetail"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
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
          <Route path="/fitur-xyz" element={<FiturXyz />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/reports/sales" element={<SalesReport />} />
          <Route path="/reports/pharmacy" element={<PharmacyReport />} />
          <Route path="/config" element={<ConfigPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/covid-19" element={<CovidPage />} />

          <Route path="/error-400" element={
            <ErrorPage
              errorCode="400"
              description="Bad Request! Permintaan Anda tidak dapat dipahami oleh server."
              imageUrl="https://illustrations.popsy.co/amber/resistance-band-training.svg"
            />
          } />
          <Route path="/error-401" element={
            <ErrorPage
              errorCode="401"
              description="Unauthorized! Anda tidak memiliki izin untuk mengakses halaman ini."
              imageUrl="https://illustrations.popsy.co/amber/lock.svg"
            />
          } />
          <Route path="/error-403" element={
            <ErrorPage
              errorCode="403"
              description="Forbidden! Akses ke halaman ini dilarang."
              imageUrl="https://illustrations.popsy.co/amber/shrugging-man.svg"
            />
          } />
          <Route path="*" element={
            <ErrorPage
              errorCode="404"
              description="Halaman Tidak Ditemukan! Maaf, halaman yang Anda cari tidak tersedia."
              imageUrl="https://illustrations.popsy.co/amber/crashed-error.svg"
            />
          } />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>
      </Routes>
    </Suspense>
  )

}

export default App;
