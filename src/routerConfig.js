import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/home";

const RouterConfig = (props) => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </Router>
  );
};

export default RouterConfig;
