import "./App.css";

import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import LoginPage from "./LoginPage.jsx";
import DonationAndRequestPage from "./DonationAndRequestPage.jsx";
import SettingsPage from "./SettingsPage.jsx";
import PostCreationPage from "./PostCreationPage.jsx";
import SavedPage from "./SavedPage.jsx";
import MyPosts from "./myPosts.jsx";
import SignUpPage from "./SignUpPage.jsx";
import { socket } from "./utils/socket.js";
import NotificationsPage from "./NotificationsPage.jsx";

export const Context = createContext();

function App() {
  const SESSION_STORAGE_USER_KEY = "user";
  const [user, setUser] = useState(() => {
    const user = sessionStorage.getItem(SESSION_STORAGE_USER_KEY);
    return user ? JSON.parse(user) : null;
  });

  const backendUrl = import.meta.env.VITE_BACKEND;
  useEffect(() => {
    const fetchLogIn = async () => {
      const logIn = await fetch(`${backendUrl}/me`, {
        credentials: "include",
      });
      const logInValues = await logIn.json();
      if (logIn.status === 200) {
        sessionStorage.setItem("user", JSON.stringify(logInValues));
        setUser(logInValues);
      }
    };
    if (user == null) {
      fetchLogIn();
    }
  }, [user]);

  const PrivateRoutes = ({ currentUser }) => {
    if (currentUser?.id) {
      return <Outlet />;
    } else {
      return <Navigate to="/" />;
    }
  };

  window.addEventListener('load', () => {
    if(user!==null){
      socket.emit("newUser", user.id)
    }
  })
  return (
    //router functionality for when we navigate to pages
    <Context.Provider value={{ user, setUser, backendUrl }}>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes currentUser={user} />}>
            <Route path="/settings" element={<SettingsPage />}></Route>
            <Route path="/makeAPost" element={<PostCreationPage />}></Route>
            <Route path="/saved" element={<SavedPage />}></Route>
            <Route path="/myPosts" element={<MyPosts />}></Route>
            <Route path="/items" element={<DonationAndRequestPage />}></Route>
            <Route path="/notifications" element={<NotificationsPage />}></Route>
          </Route>
          <Route path="/signUp" element={<SignUpPage />}></Route>
          <Route path="/" element={<LoginPage />}></Route>
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
