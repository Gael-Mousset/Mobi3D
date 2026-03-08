import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import AppLayout from '@/components/layout/AppLayout';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/DashboardPage';
import CataloguePage from '@/pages/CataloguePage';
import ScannerPage from '@/pages/ScannerPage';
import ViewerPage from '@/pages/ViewerPage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  const { user, login, logout } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage onLogin={login} />} />
        <Route
          element={
            <ProtectedRoute>
              <AppLayout user={user!} onLogout={logout} />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardPage user={user!} />} />
          <Route path="/catalogue" element={<CataloguePage />} />
          <Route path="/scanner" element={<ScannerPage user={user!} />} />
          <Route path="/viewer" element={<ViewerPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
