import { NavLink, useNavigate } from 'react-router-dom';
import Input from '../components/forms/Input';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { IAuthState } from '../redux/Auth/auth.types';
import { signupUserWithEmailAndPasword } from '../redux/Auth/auth.action';

const mapState = ({ auth }: { auth: IAuthState }) => ({
  currentUser: auth.user,
  success: auth.success,
  multipleUsers: auth.multipleUsers,
  multipleUserFlow: auth.multipleUserFlow,
});

const SignupPage = () => {
  const { success } = useSelector(mapState);
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      resetForm();
      navigate('/');
    }
  }, [success]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e?.preventDefault();
      dispatch(
        signupUserWithEmailAndPasword({
          email,
          password,
          companyName,
          firstName,
          lastName,
        })
      );
    } catch (error) {
      console.log(error);
      const err = ['Error while signing up. Please try again'];
      setErrors(err);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setCompanyName('');
    setFirstName('');
    setLastName('');
    setErrors([]);
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <div>
                {errors.map((err, index) => (
                  <p className="text-red-500" key={index}>
                    {err}
                  </p>
                ))}
              </div>
              <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={handleSubmit}
              >
                <div>
                  <Input
                    type="companyName"
                    name="companyName"
                    id="companyName"
                    onChange={(e) => setCompanyName(e.target.value)}
                    value={companyName}
                    placeholder="Sciflare"
                    required
                    label="Company Name"
                  />
                </div>
                <div>
                  <Input
                    type="firstName"
                    name="firstName"
                    id="firstName"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    placeholder="Alan"
                    required
                    label="First Name"
                  />
                </div>
                <div>
                  <Input
                    type="lastName"
                    name="lastName"
                    id="lastName"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    placeholder="Walker"
                    required
                    label="Last Name"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="name@company.com"
                    required
                    label="Email"
                  />
                </div>
                <div>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder="••••••••"
                    required
                    label="Password"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign Up
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already created company
                  <NavLink
                    to="/login"
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500 ml-2"
                  >
                    Login
                  </NavLink>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignupPage;
