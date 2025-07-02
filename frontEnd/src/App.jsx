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

function App() {
  return (
    //router functionality for when we navigate to pages
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/items" element={<DonationAndRequestPage />}></Route>
        <Route path="/settings" element={<SettingsPage />}></Route>
        <Route path="/makeAPost" element={<PostCreationPage />}></Route>
        <Route path="/saved" element={<SavedPage />}></Route>
        <Route path="/myPosts" element={<MyPosts />}></Route>
        <Route path="/signUp" element={<SignUpPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
