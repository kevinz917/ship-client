import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Theme, GlobalStyle } from "./global_styles/themes";
import { ThemeProvider } from "styled-components";
import axios from "axios";
import { casCheck } from "./api/user";
import { useSelector, useDispatch } from "react-redux";
import { SET_VAL } from "./redux/masterReducer";
import { PROD } from "./util/base";
import { setAmplitudeUserId } from "./util/amplitude";
import styled from "styled-components";

// pages
import Landing from "./pages/newlanding";
import About from "./pages/about";
import Leaderboard from "./pages/leaderboard";
import NewShip from "./pages/newship";
import Profile from "./pages/profile";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/notFound";
import TempLanding from "./pages/tempLanding";

//components
import ShipNavbar from "./components/navbar";
import Help from "./components/help";

// const dotenv = require("dotenv");

const StyledBackground = styled.div`
  background-image: linear-gradient(#815ef2, #ead1ff);
`;

const StyledTitleBackground = styled.div`
  background-image: radial-gradient(
    circle at 10% 20%,
    rgba(255, 207, 181, 1) 0%,
    rgba(255, 207, 181, 0.8) 10%,
    rgba(255, 207, 181, 0.7) 20%,
    rgba(255, 207, 181, 0) 60%
  );
  color: ${({ theme }) => theme.primary};

  .loading {
    opacity: 0;
    pointer-events: none;
  }

  .loaded {
    transition: opacity 0.5s;
    opacity: 1;
  }
`;

function App() {
  const dispatch = useDispatch();
  axios.defaults.withCredentials = true;
  const auth = useSelector((state) => state.state.auth);

  useEffect(() => {
    const onMount = async () => {
      const auth = await casCheck();
      if (
        !auth ||
        !auth.data.auth ||
        !auth.data.user ||
        !auth.data.user.userId
      ) {
        dispatch(SET_VAL("auth", false));
      } else {
        setAmplitudeUserId(`${auth.data.user.netId}`);
        dispatch(SET_VAL("auth", true));
      }
    };
    onMount();
  }, [dispatch]);

  return (
    <ThemeProvider theme={Theme}>
      <StyledBackground
        style={{ minHeight: "100vh", minWidth: "100vw" }}
        id="main"
      >
        <StyledTitleBackground style={{ minWidth: "100vw" }}>
          <Router>
            <GlobalStyle />
            <ShipNavbar />
            <Help />
            {auth !== -1 && (
              <Switch>
                <PrivateRoute
                  exact
                  path="/leaderboard"
                  component={Leaderboard}
                />
                <PrivateRoute exact path="/ship" component={NewShip} />
                <PrivateRoute exact path="/profile" component={Profile} />
                <PrivateRoute exact path="/faq" component={About} />
                <Route exact path="/login">
                  {auth ? <Redirect to="/ship" /> : <Landing />}
                </Route>
                <Route exact path="/">
                  {auth ? <Redirect to="/ship" /> : <Redirect to="/login" />}
                </Route>
                <Route exact={false} component={NotFound} />
              </Switch>
            )}
          </Router>
        </StyledTitleBackground>
      </StyledBackground>
    </ThemeProvider>
  );
}

export default App;
