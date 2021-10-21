import "./App.scss";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Watch from "./pages/watch/Watch";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  const user = true;
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            {user ? <Home /> : <Redirect to="/register" />}
          </Route>
          <Route exact path="/register">
            {!user ? <Register /> : <Redirect to="/" />}
          </Route>

          <Route exact path="/login">
            {!user ? <Login /> : <Redirect to="/" />}
          </Route>

          {user && (
            <>
              <Route path="/movies">
                <Home type="movies" />
              </Route>
              <Route path="/series">
                <Home type="series" />
              </Route>
              <Route path="/watch">
                <Watch />
              </Route>
            </>
          )}
        </Switch>
      </Router>
      {/* <Login />
      <Register/>
      <Watch /> */}
    </div>
  );
}

export default App;
