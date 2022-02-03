import { Navigate, Outlet, Route, Routes as Switch } from 'react-router-dom';
import { useCookie } from 'react-use';
import Index from '../pages/Index';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import { Register } from '../pages/Register';
import { INDEX, LOGIN, PROFILE, REGISTER } from './routes';

export const ProtectedRoute = () => {
  const [accessToken] = useCookie('jwt');
  return accessToken ? <Outlet /> : <Navigate to={LOGIN} />;
};

export const Routes = (): JSX.Element => {
  return (
    <Switch>
      <Route element={<ProtectedRoute />}>
        <Route path={PROFILE} element={<Profile />} />
      </Route>
      <Route path={INDEX} element={<Index />} />
      <Route path={LOGIN} element={<Login />} />
      <Route path={REGISTER} element={<Register />} />
    </Switch>
  );
};
