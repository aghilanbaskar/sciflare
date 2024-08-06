import { useEffect, useState } from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import './App.css';
import MainLayouts from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import { IAuthState } from './redux/Auth/auth.types';
import { useDispatch, useSelector } from 'react-redux';
import usersService from './services/user.service';
import { initializeAuth } from './redux/Auth/auth.action';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayouts />}>
      <Route index element={<HomePage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Route>
  )
);
const mapState = ({ auth }: { auth: IAuthState }) => ({
  userId: auth.userId,
  currentUser: auth.user,
});
function App() {
  const dispatch = useDispatch();
  const { userId } = useSelector(mapState);
  useEffect(() => {
    console.log('User Id Changed', userId);
    dispatch(initializeAuth(userId));
  }, [userId]);
  return <RouterProvider router={router} />;
}

export default App;
