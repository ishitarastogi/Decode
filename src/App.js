
import { Route, Switch } from "react-router-dom";
import MainNavigation from "./components/layout/MainNavigation";
import "./App.css"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Login from "./components/Login";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import CreateProfiles from "./pages/CreateProfile";
import Display from "./pages/Display";
import Docs from "./pages/Document";
import Video from "./pages/Videos";
import Project from "./pages/Projects";
import Home from "./components/Home/Home";
import MyProfile from "./pages/MyProfile";
import Logout from "./components/logout/Logout";
function App() {
  return (
    <div className="App">
      <header className="header">
                <ConnectButton chainStatus="none" />

        <Login className="button" />

        {/* <div>
          <FontAwesomeIcon icon="fa-solid fa-code" className="code" />

          <Link to="/" className="logo">
            Decode
            <FontAwesomeIcon icon="fab fa-firstdraft" />
          </Link>
        </div> */}
      </header>

      <MainNavigation />

      <Switch>
        <Route path="/" exact={true}>
          <Home />
        </Route>

        <Route path="/explore">
          <Display />
        </Route>
        <Route path="/myProfile">
          <MyProfile />
        </Route>
        <Route path="/createProfile">
          <CreateProfiles />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="/docs">
          <Docs />
        </Route>
        <Route path="/video">
          <Video />
        </Route>
        <Route path="/project">
          <Project />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
