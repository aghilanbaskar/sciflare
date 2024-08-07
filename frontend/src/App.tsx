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
import { initializeAuth } from './redux/Auth/auth.action';
import ProfilePage from './pages/ProfilePage';
import UsersPage from './pages/UsersPage';
import OrganizationPage from './pages/OrganizationPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayouts />}>
      <Route index element={<HomePage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/organization" element={<OrganizationPage />} />
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
  const [firstTime, setFirstTime] = useState(true);
  useEffect(() => {
    dispatch(initializeAuth(userId, firstTime));
    setFirstTime(false);
  }, [userId]);
  return <RouterProvider router={router} />;
}

export default App;
