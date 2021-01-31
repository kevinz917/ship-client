import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// pages
import Landing from "./pages/landing";
import Leaderboard from "./pages/leaderboard";
import NewShip from "./pages/newship";

//components
import ShipNavbar from "./components/navbar";

function App() {
  return (
    <Router>
      <ShipNavbar />
      <Switch>
        <Route exact path="/leaderboard" component={Leaderboard} />
        <Route exact path="/ship" component={NewShip} />
        <Route exact path="/" component={Landing} />
      </Switch>
    </Router>
  );
}

export default App;
