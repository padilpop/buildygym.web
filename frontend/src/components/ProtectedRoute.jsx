import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, token, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
          fontFamily: 'var(--font-display)',
          fontSize: '1.25rem',
          color: 'var(--color-accent)',
          letterSpacing: '1px',
        }}
      >
        MEMVERIFIKASI AKSES ADMIN...
      </div>
    );
  }

  if (!user || !token) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}
