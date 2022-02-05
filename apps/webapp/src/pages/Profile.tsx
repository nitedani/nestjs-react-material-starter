import { useQuery } from 'react-query';
import { getProfile } from '../api/api';

const Profile: React.FC = () => {
  const { data: user } = useQuery('profile', getProfile);
  return <div>Profile {JSON.stringify(user)}</div>;
};

export default Profile;
