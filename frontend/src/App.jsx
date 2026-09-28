import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './layouts/AdminLayout';

// Public Landing Page
import LandingPage from './pages/public/LandingPage';

// Admin Pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Memberships from './pages/admin/Memberships';
import Trainers from './pages/admin/Trainers';
import Branches from './pages/admin/Branches';
import Facilities from './pages/admin/Facilities';
import Testimonials from './pages/admin/Testimonials';
import Gallery from './pages/admin/Gallery';
import Faqs from './pages/admin/Faqs';
import Settings from './pages/admin/Settings';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Admin Authentication */}
          <Route path="/admin/login" element={<Login />} />

          {/* Protected Admin CMS Dashboard & CRUD Modules */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="memberships" element={<Memberships />} />
            <Route path="trainers" element={<Trainers />} />
            <Route path="branches" element={<Branches />} />
            <Route path="facilities" element={<Facilities />} />
            <Route path="testimonials" element={<Testimonials />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="faqs" element={<Faqs />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

