import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// pages
import Landing from "./pages/landing";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
      </Switch>
    </Router>
  );
}

export default App;
