import { FormEvent, useEffect, useState, useCallback } from 'react';
import Card from './Card';
import Input from './forms/Input';
import Select from './forms/Select';
import usersService from '../services/user.service';
import { IAuthState } from '../redux/Auth/auth.types';
import { useSelector } from 'react-redux';
import { isAxiosError } from 'axios';
import { userRoleEnum } from '../interfaces/User';

interface ProfileCardProps {
  userId?: string;
  onUserSaved?: () => void;
}
const mapState = ({ auth }: { auth: IAuthState }) => ({
  currentUser: auth.user,
  organizationId: auth.organizationId,
});

const ProfileCard = ({ userId, onUserSaved }: ProfileCardProps) => {
  const { organizationId } = useSelector(mapState);
  const roleOptions = [
    { label: 'Admin', value: userRoleEnum.ADMIN },
    { label: 'User', value: userRoleEnum.USER },
  ];
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(roleOptions[0].value);
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  function handleSelectRole(value: userRoleEnum): void {
    setRole(value);
  }

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();
      try {
        const user = userId
          ? await usersService.update(userId, {
              firstName,
              lastName,
              email,
              password,
              role,
            })
          : await usersService.create({
              organizationId,
              firstName,
              lastName,
              email,
              password,
              role,
            });
        console.log(user)
        onUserSaved && onUserSaved();
      } catch (error: unknown) {
        console.log(error);
        if (isAxiosError(error)) {
          setErrors([error?.response?.data.message || error.message]);
        } else if (error instanceof Error) {
          setErrors([error.message]);
        }
      }
    },
    [
      userId,
      onUserSaved,
      email,
      firstName,
      lastName,
      password,
      role,
      organizationId,
    ]
  );

  const getUserData = useCallback(async () => {
    if (userId) {
      const { data: user } = await usersService.get(userId);
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setRole(user.role);
    }
  }, [userId]);
  useEffect(() => {
    getUserData();
  }, [userId, getUserData]);

  return (
    <>
      <Card
        title="Profile"
        description="View your profile here"
        onClick={() => {}}
        className="w-full flex justify-center"
      >
        <div>
          {errors.length > 0 &&
            errors.map((error: string, index: number) => (
              <p key={index} className="text-red-500">
                {error}
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
          <div>
            <Select
              options={roleOptions}
              onSelect={handleSelectRole}
              selectedValue={role}
              label="Role"
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Save
          </button>
        </form>
      </Card>
    </>
  );
};

export default ProfileCard;
