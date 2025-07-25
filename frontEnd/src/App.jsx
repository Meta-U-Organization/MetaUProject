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
  const [signedInUser, setSignedInUser] = useState(() => {
    const user = sessionStorage.getItem(SESSION_STORAGE_USER_KEY);
    return user ? JSON.parse(user) : null;
  });

  const backendUrl = import.meta.env.VITE_BACKEND;

  const PrivateRoutes = ({ currentUser }) => {
    if (currentUser?.id) {
      return <Outlet />;
    } else {
      return <Navigate to="/" />;
    }
  };

  useEffect(() => {
    if(signedInUser!==null){
      socket.emit("newUser", signedInUser.id)
    }
  }, [])
  return (
    //router functionality for when we navigate to pages
    <Context.Provider value={{ signedInUser, setSignedInUser, backendUrl }}>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes currentUser={signedInUser} />}>
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
