import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import PostDetail from '../pages/PostDetail';
import Login from '../pages/Login';
import Register from '../pages/Register';
import CreatePost from '../pages/CreatePost';
import PrivateRoute from './PrivateRoute';
import Posts from '../pages/Posts';
import Container from '../components/Container';

export function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Container><Home /></Container>} />
      <Route path='/posts' element={<Container><Posts /></Container>} />
      <Route path='/posts/:slug' element={<PostDetail />} />
      <Route path='/login' element={<Container><Login /></Container>} />
      <Route path='/register' element={<Container><Register /></Container>} />
      <Route
        path='/create'
        element={
          <PrivateRoute>
            <Container><CreatePost /></Container>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
