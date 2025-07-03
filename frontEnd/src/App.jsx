import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./mainPage.jsx";
import LoginPage from "./LoginPage.jsx";
import DonationAndRequestPage from "./DonationAndRequestPage.jsx";
import SettingsPage from "./SettingsPage.jsx";
import PostCreationPage from "./PostCreationPage.jsx";
import SavedPage from "./SavedPage.jsx";
import MyPosts from "./myPosts.jsx";
import SignUpPage from "./SignUpPage.jsx";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND;

  useEffect(() => {
    const fetchLogIn = async () => {
      const logIn = await fetch(`${backendUrl}me`, {
        credentials: "include",
      });
      if (logIn.status === 200) {
        setLoggedIn(true);
      }
    };
    fetchLogIn();
  }, []);

  return (
    //router functionality for when we navigate to pages
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/items" element={<DonationAndRequestPage />}></Route>
        <Route
          path="/settings"
          element={loggedIn ? <SettingsPage /> : <LoginPage />}
        ></Route>
        <Route
          path="/makeAPost"
          element={loggedIn ? <PostCreationPage /> : <LoginPage />}
        ></Route>
        <Route
          path="/saved"
          element={loggedIn ? <SavedPage /> : <LoginPage />}
        ></Route>
        <Route
          path="/myPosts"
          element={loggedIn ? <MyPosts /> : <LoginPage />}
        ></Route>
        <Route path="/signUp" element={<SignUpPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
