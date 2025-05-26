import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { showMessage } from '../adapter';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>; // ou spinner, skeleton, etc.
  }

  if (!isAuthenticated) {
    showMessage.warn("Para acessar esta pagina tem que estar logado")
    return <Navigate to='/login' replace />;
  }

  return children;
}
