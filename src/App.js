import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import QuotePicList from "./components/QuotePicList";
import CreateQuotePic from "./components/CreateQuotePic";

function App() {
  const [user, setUser] = useState(undefined);
  const [token, setToken] = useState(undefined);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch('/api/users/userinfo', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          console.error('bad user fetch');
          setUser(undefined);
        }

        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        console.error(err);
      }
    }

    if (token) {
      getUser();
    }
  }, [token]);

  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route
            exact
            path="/login"
            render={props => {
              if (user) {
                return <Redirect to="/" />;
              }
              return <Login setToken={setToken} {...props} />;
            }}
          />
          <Route exact path="/createquotepic"
            render={props => {
              return <CreateQuotePic />
            }}
          />
          <Route
            exact
            path="/signup"
            render={props => {
              if (user) {
                return <Redirect to="/" />;
              }
              return <SignUp setToken={setToken} {...props} />;
            }}
          />
          <Route
            path="/quotepics"
            render={props => {
              return <QuotePicList />
            }}
          />
          <Route
            path="/"
            render={props => {
              if (!user) {
                return <Redirect to="/quotepics" />;
              }
              return <QuotePicList />;
            }}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
