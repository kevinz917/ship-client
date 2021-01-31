import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Theme } from "./global_styles/themes";
import { ThemeProvider } from "styled-components";

// pages
import Landing from "./pages/landing";
import Leaderboard from "./pages/leaderboard";
import NewShip from "./pages/newship";
import Profile from "./pages/profile";

//components
import ShipNavbar from "./components/navbar";

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <Router>
        <ShipNavbar />
        <Switch>
          <Route exact path="/leaderboard" component={Leaderboard} />
          <Route exact path="/ship" component={NewShip} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/" component={Landing} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
