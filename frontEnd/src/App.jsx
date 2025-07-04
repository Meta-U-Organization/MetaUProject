import "./App.css";

import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { createContext, useEffect, useState } from "react";

import MainPage from "./mainPage.jsx";
import LoginPage from "./LoginPage.jsx";
import DonationAndRequestPage from "./DonationAndRequestPage.jsx";
import SettingsPage from "./SettingsPage.jsx";
import PostCreationPage from "./PostCreationPage.jsx";
import SavedPage from "./SavedPage.jsx";
import MyPosts from "./myPosts.jsx";
import SignUpPage from "./SignUpPage.jsx";

export const Context = createContext();

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState("1");
  const [user, setUser] = useState({ donationPosts: [], requestPosts: [] });
  const backendUrl = import.meta.env.VITE_BACKEND;

  const PrivateRoutes = ({ IsLoggedInCurrent }) => {
    return IsLoggedInCurrent ? <Outlet /> : <Navigate to="/login" />;
  };

  useEffect(() => {
    const fetchLogIn = async () => {
      const logIn = await fetch(`${backendUrl}me`, {
        credentials: "include",
      });
      const logInValues = await logIn.json();
      if (logIn.status === 200) {
        console.log("hello");
        setLoggedIn(true);
        setUserId(logInValues.id);
        const user = await fetch(`${backendUrl}users/${logInValues.id}`);
        const userRead = await user.json();
        setUser(userRead);
      }
    };
    fetchLogIn();
  }, []);

  return (
    //router functionality for when we navigate to pages
    <Context.Provider value={{ userId, setUserId, user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/items" element={<DonationAndRequestPage />}></Route>
          <Route element={<PrivateRoutes isLoggedInCurrent={isLoggedIn} />}>
            <Route path="/settings" element={<SettingsPage />}></Route>
            <Route path="/makeAPost" element={<PostCreationPage />}></Route>
            <Route path="/saved" element={<SavedPage />}></Route>
            <Route path="/myPosts" element={<MyPosts />}></Route>
          </Route>
          <Route path="/signUp" element={<SignUpPage />}></Route>
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
