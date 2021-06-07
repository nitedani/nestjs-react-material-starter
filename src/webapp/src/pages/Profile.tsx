import { useQuery } from "react-query";
import { getProfile } from "../api/api";

const Profile: React.FC = () => {
  const { data: user } = useQuery("profile", getProfile);
  return <h1>Profile {JSON.stringify(user)}</h1>;
};

export default Profile;
