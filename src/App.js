import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Theme } from "./global_styles/themes";
import { ThemeProvider } from "styled-components";
import axios from "axios";
import { casCheck } from "./api/user";
import { useSelector, useDispatch } from "react-redux";
import { SET_VAL } from "./redux/masterReducer";

// pages
import Landing from "./pages/landing";
import Leaderboard from "./pages/leaderboard";
import NewShip from "./pages/newship";
import Profile from "./pages/profile";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/notFound";

//components
import ShipNavbar from "./components/navbar";

function App() {
  const dispatch = useDispatch();
  axios.defaults.withCredentials = true;
  const auth = useSelector((state) => state.state.auth);

  useEffect(() => {
    const onMount = async () => {
      const auth = await casCheck();
      // console.log(auth);
      if (
        !auth ||
        !auth.data.auth ||
        !auth.data.user ||
        !auth.data.user.userId
      ) {
        dispatch(SET_VAL("auth", false));
      } else {
        dispatch(SET_VAL("auth", true));
      }
    };
    onMount();
  }, []);

  return (
    <ThemeProvider theme={Theme}>
      <Router>
        <ShipNavbar />
        {auth !== -1 && (
          <Switch>
            <PrivateRoute exact path="/leaderboard" component={Leaderboard} />
            <PrivateRoute exact path="/ship" component={NewShip} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <Route exact path="/">
              {auth ? <Redirect to="/ship" /> : <Landing />}
            </Route>
            <Route exact={false} component={NotFound} />
          </Switch>
        )}
      </Router>
    </ThemeProvider>
  );
}

export default App;
