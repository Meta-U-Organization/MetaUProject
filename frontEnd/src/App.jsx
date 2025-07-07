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
  const [user, setUser] = useState(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : { donationPosts: [], requestPosts: [] };
  });
  const backendUrl = import.meta.env.VITE_BACKEND;

  useEffect(() => {
    const fetchLogIn = async () => {
      const logIn = await fetch(`${backendUrl}me`, {
        credentials: "include",
      });
      const logInValues = await logIn.json();
      console.log(logInValues);
      if (logIn.status === 200) {
        const user = await fetch(`${backendUrl}users/${logInValues.id}`);
        const userRead = await user.json();
        localStorage.setItem("user", JSON.stringify(userRead));
        setUser(userRead);
      }
    };
    if (!user.id) {
      fetchLogIn();
    }
  }, [user]);

  const PrivateRoutes = ({ currentUser }) => {
    console.log(currentUser);
    if (currentUser.id) {
      return <Outlet />;
    } else {
      return <Navigate to="/login" />;
    }
  };

  return (
    //router functionality for when we navigate to pages
    <Context.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route element={<PrivateRoutes currentUser={user} />}>
            <Route path="/settings" element={<SettingsPage />}></Route>
            <Route path="/makeAPost" element={<PostCreationPage />}></Route>
            <Route path="/saved" element={<SavedPage />}></Route>
            <Route path="/myPosts" element={<MyPosts />}></Route>
            <Route path="/items" element={<DonationAndRequestPage />}></Route>
          </Route>
          <Route path="/signUp" element={<SignUpPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
