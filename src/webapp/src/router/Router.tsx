import { Switch, Route, Redirect, RouteProps } from "react-router-dom";
import { useCookie } from "react-use";
import Index from "../pages/Index";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import { INDEX, LOGIN, PROFILE } from "./routes";

export const ProtectedRoute = (props: RouteProps): JSX.Element => {
  const { children, ...rest } = props;
  const [accessToken] = useCookie("jwt");
  return accessToken ? (
    <Route {...rest}>{children}</Route>
  ) : (
    <Redirect to={LOGIN}></Redirect>
  );
};

export const Routes = (): JSX.Element => {
  return (
    <Switch>
      <Route exact path={INDEX}>
        <Index />
      </Route>
      <ProtectedRoute exact path={PROFILE}>
        <Profile />
      </ProtectedRoute>
      <Route exact path={LOGIN}>
        <Login />
      </Route>
    </Switch>
  );
};
