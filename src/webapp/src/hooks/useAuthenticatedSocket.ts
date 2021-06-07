import { useCookie } from 'react-use';
import { useSocket } from 'socket.io-react-hook';

export const useAuthenticatedSocket = () => {
  const [accessToken] = useCookie('jwt');
  return useSocket({
    enabled: !!accessToken,
  });
};
