import logo from '../assets/sciflarelogo.svg';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IAuthState } from '../redux/Auth/auth.types';
import '../css/header.css';

const mapState = ({ auth }: { auth: IAuthState }) => {
  return {
    currentUser: auth.user,
  };
};

const Header = () => {
  const { currentUser } = useSelector(mapState);
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch({ type: 'SIGNOUT' });
  };
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'navLinkActive' : 'navLink';
  return (
    <div className="header">
      <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src={logo}
              className="h-14 rounded-full overflow-hidden"
              alt="Sciflare Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Sciflare
            </span>
          </a>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            {currentUser ? (
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <NavLink to="/" className={linkClass}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/profile" className={linkClass}>
                    Profile
                  </NavLink>
                </li>
                {currentUser.role === 'admin' && (
                  <>
                    <li>
                      <NavLink to="/users" className={linkClass}>
                        Users
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/organization" className={linkClass}>
                        Organization
                      </NavLink>
                    </li>
                  </>
                )}
                <li>
                  <Link to="/" onClick={() => signOut()}>
                    Logout
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="header-ul">
                <li>
                  <NavLink to="/login" className={linkClass}>
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/signup" className={linkClass}>
                    Signup
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
