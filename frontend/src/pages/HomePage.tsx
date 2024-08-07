import { NavLink } from 'react-router-dom';
import logo from '../assets/sciflarelogo.svg';
import { IAuthState } from '../redux/Auth/auth.types';
import { useSelector } from 'react-redux';
import Card from '../components/Card';

const mapState = ({ auth }: { auth: IAuthState }) => ({
  currentUser: auth.user
});
const HomePage = () => {
  const { currentUser } = useSelector(mapState);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src={logo} alt="logo" className="w-64 mb-10" />
      <h1 className="text-4xl font-bold mb-4">Welcome to Sciflare Assessment Task</h1>
      <p className="text-lg mb-10">
        Sciflare is a platform for connecting coders and providing a space for
        them to showcase their skills and projects.
      </p>
      {
        currentUser ? <div className="bg-white shadow-md rounded-lg p-6 text-center m-4">
        <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
        <p className="text-gray-700">
          {currentUser?.email}
        </p>
        <p className="text-gray-700 mb-4">
          {currentUser?.firstName} {currentUser?.lastName}
        </p>
      </div>: null
      }
      {currentUser ? (
        <div className="flex flex-col items-center space-y-8 sm:flex-row sm:space-x-8 sm:space-y-0">
          <NavLink to="/profile" className="btn bg-blue-500 p-2 mr-4 rounded-full text-white">
            View my profile
          </NavLink>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-8 sm:flex-row sm:space-x-8 sm:space-y-0">
          <NavLink to="/signup" className="btn bg-blue-500 p-2 mr-4 rounded-full text-white">
            Sign Up
          </NavLink>
          <NavLink to="/login" className="btn bg-blue-500 p-2 rounded-full text-white">
            Log In
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default HomePage;

