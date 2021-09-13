import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ScrollToTop from "./handler/scrollToTop";
import Home from "./pages/home/home";

const RouterConfig = (props) => {
  return (
    <Router>
      <ScrollToTop />
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </Router>
  );
};

export default RouterConfig;
