import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = (props) => {
  const auth = useSelector((state) => state.state.auth);

  switch (auth) {
    case false:
      return <Redirect to="/login" />;
    case true:
      return (
        <Route
          path={props.path}
          exact={props.exact}
          component={props.component}
        />
      );
    default:
      return null;
  }
};

export default PrivateRoute;
