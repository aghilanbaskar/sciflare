import { useSelector } from 'react-redux';
import ProfileCard from '../components/ProfileCard';
import { IAuthState } from '../redux/Auth/auth.types';

const mapState = ({ auth }: { auth: IAuthState }) => ({
  userId: auth.userId,
});
const ProfilePage = () => {
  const { userId } = useSelector(mapState);
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-1/3">
        <ProfileCard userId={userId}></ProfileCard>
      </div>
    </div>
  );
};

export default ProfilePage;
