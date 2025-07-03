import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { useState, useEffect } from "react";
import MainPage from "./mainPage.jsx";
import LoginPage from "./LoginPage.jsx";
import DonationAndRequestPage from "./DonationAndRequestPage.jsx";
import SettingsPage from "./SettingsPage.jsx";
import PostCreationPage from "./PostCreationPage.jsx";
import SavedPage from "./SavedPage.jsx";
import MyPosts from "./myPosts.jsx";
import SignUpPage from "./SignUpPage.jsx";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND;

  const PrivateRoutes = (IsLoggedInCurrent) => {
    return IsLoggedInCurrent ? <Outlet /> : <Navigate to="/login" />;
  };

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

        <Route element={<PrivateRoutes isLoggedInCurrent={isLoggedIn} />}>
          <Route path="/settings" element={<SettingsPage />}></Route>
          <Route path="/makeAPost" element={<PostCreationPage />}></Route>
          <Route path="/saved" element={<SavedPage />}></Route>
          <Route path="/myPosts" element={<MyPosts />}></Route>
        </Route>

        <Route path="/signUp" element={<SignUpPage />}></Route>
        <Route path="*" element={<LoginPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
