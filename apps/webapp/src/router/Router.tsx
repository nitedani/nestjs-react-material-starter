import {
  Routes as Switch,
  Route,
  Navigate,
  RouteProps,
} from 'react-router-dom';
import { useCookie } from 'react-use';
import Index from '../pages/Index';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import { INDEX, LOGIN, PROFILE } from './routes';

export const ProtectedRoute = (props: RouteProps): JSX.Element => {
  const { children, ...rest } = props;
  const [accessToken] = useCookie('jwt');
  return accessToken ? (
    <Route {...rest}>{children}</Route>
  ) : (
    <Navigate to={LOGIN} />
  );
};

export const Routes = (): JSX.Element => {
  return (
    <Switch>
      <ProtectedRoute path={PROFILE} element={<Profile />} />
      <Route path={INDEX} element={<Index />} />
      <Route path={LOGIN} element={<Login />} />
    </Switch>
  );
};
