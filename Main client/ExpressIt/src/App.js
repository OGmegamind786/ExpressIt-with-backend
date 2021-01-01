import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import CreateProfile from "./components/CreateProfile";
import CreateExpresso from "./components/CreateExpresso";
import ProtectedRoute from "./components/ProtectedRoute";
import Explore from "./components/Explore";
import Favourites from "./components/Favourites";

//TODO
//click to view article -----done
//add insert image ------done
//add to favorites ------90 % done , stuck on adding duplicate fav
//search api -----done
//chat box
function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <ProtectedRoute path="/users/me/favoriteExpresso">
            <Favourites />
          </ProtectedRoute>
          <ProtectedRoute path="/users/me/feed">
            <Explore />
          </ProtectedRoute>
          <ProtectedRoute path="/users/me/createExpresso">
            <CreateExpresso />
          </ProtectedRoute>
          <ProtectedRoute path="/users/me/createProfile">
            <CreateProfile />
          </ProtectedRoute>
          <ProtectedRoute path="/users/me/profile">
            <Profile />
          </ProtectedRoute>
          <Route path="/users/login">
            <Login />
          </Route>
          <Route path="/users/register">
            <Register />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
