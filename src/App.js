import React, { useEffect, useState } from "react";
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
import { ToastContainer, Slide } from "react-toastify";

// pages
import Login from "./pages/login";
import Landing from "./pages/landing";
import Leaderboard from "./pages/leaderboard";
import NewShip from "./pages/newship";
import Profile from "./pages/profile";

//components
import ShipNavbar from "./components/Navbar";

function App() {
  axios.defaults.withCredentials = true;
  const [loggedIn, setLoggedIn] = useState(-1);

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
        setLoggedIn(false);
      } else {
        setLoggedIn(true);
      }
    };
    onMount();
  }, []);

  return (
    <ThemeProvider theme={Theme}>
      <Router>
        <ShipNavbar />
        {loggedIn !== -1 && (
          <Switch>
            <Route exact path="/login">
              {loggedIn ? <Redirect to="/leaderboard" /> : <Login />}
            </Route>
            <Route exact path="/leaderboard">
              {loggedIn ? <Leaderboard /> : <Redirect to="/login" />}
            </Route>
            <Route exact path="/ship">
              {loggedIn ? <NewShip /> : <Redirect to="/login" />}
            </Route>
            <Route exact path="/profile">
              {loggedIn ? <Profile /> : <Redirect to="/login" />}
            </Route>
            <Route exact path="/">
              {loggedIn ? <Landing /> : <Redirect to="/login" />}
            </Route>
          </Switch>
        )}
        <ToastContainer
          transition={Slide}
          autoClose={2000}
          hideProgressBar={true}
        />
      </Router>
    </ThemeProvider>
  );
}

export default App;
