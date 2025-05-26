import { NavLink, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import { Logo } from '../Logo';
import { useAuth } from '../../context/useAuth';
import { LogIn } from 'lucide-react';

export default function Header() {
  const { user, isAuthenticated, loading, logout } = useAuth();

   const navigate = useNavigate();

  function handleRedirectToLogin() {
    navigate("/login");
  }


  return (
    <div className={styles.header}>
      <div className={styles.menu}>
        <Logo />
        <NavLink className={styles.links} to={'/'}>
          Home
        </NavLink>
        <NavLink className={styles.links} to={'/posts'}>
          Posts
        </NavLink>
        <NavLink className={styles.links} to={'/create'}>
          Criar
        </NavLink>
        <NavLink className={styles.links} to={'/login'}>
          Login
        </NavLink>
      </div>
      <div className={styles.haveUser}>

      {/* Mostra loading se estiver carregando */}
      {loading && <p>Carregando...</p>}

      {/* Mostra saudação e botão se autenticado */}
      {!loading && isAuthenticated && user ? (
        <>
          <p>Hi, {user.username} 👋</p>
          <button className='defaultButton' onClick={logout}>Sair</button>
        </>
      ) : (
        
        <button className='defaultButton' onClick={handleRedirectToLogin}>Entrar <LogIn /> </button>
      )}
      </div>
    </div>
  );
}
