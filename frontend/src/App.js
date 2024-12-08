import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import LandingPage from "./components/pages/landingPage";
import HomePage from "./components/pages/homePage";
import Login from "./components/pages/loginPage";
import Signup from "./components/pages/registerPage";
import PrivateUserProfile from "./components/pages/privateUserProfilePage";
import { createContext } from "react";
import getUserInfo from "./utilities/decodeJwt";

export const UserContext = createContext();

const App = () => {
  const [user, setUser] = useState(null);

  // Check user authentication status on app load
  useEffect(() => {
    const userInfo = getUserInfo();
    setUser(userInfo);
  }, []);

  return (
    <>
      <Navbar />
      <UserContext.Provider value={user}>
        <Routes>
          {/* Landing page logic: If logged in, redirect to /home */}
          <Route
            path="/"
            element={user ? <Navigate to="/home" /> : <LandingPage />}
          />
          {/* Home page: Only accessible if logged in */}
          <Route
            path="/home"
            element={user ? <HomePage /> : <Navigate to="/" />}
          />
          {/* Static routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/privateUserProfile" element={<PrivateUserProfile />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
};

export default App;
