import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import PostDetail from '../pages/PostDetail';
import Login from '../pages/Login';
import Register from '../pages/Register';
import CreatePost from '../pages/CreatePost';
import PrivateRoute from './PrivateRoute';
import Posts from '../pages/Posts';

export function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/posts' element={<Posts />} />
      <Route path='/posts/:slug' element={<PostDetail />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route
        path='/create'
        element={
          <PrivateRoute>
            <CreatePost />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
