import { useState } from "react";
import "./App.css";
import Item from "./components/item";
import Navigation from "./components/nav";
import { useEffect } from "react";
//This page will use a session to store user Id and will be specific to them, this is a base implimentation
function MyPosts() {
  const [isDonationList, setIsDonationList] = useState(true);
  const [updatePosts, setUpdatePosts] = useState(true);
  const [user, setUser] = useState({ donationPosts: [], requestPosts: [] });
  const [userId, setUserId] = useState();
  const backendUrl = import.meta.env.VITE_BACKEND;

  useEffect(() => {
    const fetchLogIn = async () => {
      const logIn = await fetch(`${backendUrl}me`, {
        credentials: "include",
      });
      const logInInfo = await logIn.json();
      setUserId(logInInfo.id);
      const user = await fetch(`${backendUrl}users/${logInInfo.id}`);
      const userRead = await user.json();
      setUser(userRead);
    };
    fetchLogIn();
  }, [isDonationList, updatePosts]);

  const changeItemType = () => {
    if (isDonationList) {
      document.getElementById("changeItemButton").innerHTML = "Go to Donations";
    } else {
      document.getElementById("changeItemButton").innerHTML = "Go to Requests";
    }
    setIsDonationList(!isDonationList);
  };
  return (
    <div>
      <header>
        <Navigation />
        <h1>My Posts</h1>
        <button id="changeItemButton" onClick={changeItemType}>
          Go to Requests
        </button>
      </header>
      <main>
        {isDonationList
          ? user.donationPosts.map((item) => {
              return (
                <Item
                  onPostChange={setUpdatePosts}
                  updatePosts={updatePosts}
                  userId={userId}
                  postType={isDonationList ? "donations" : "requests"}
                  isMyPost={true}
                  item={item}
                  key={item.id}
                />
              );
            })
          : user.requestPosts.map((item) => {
              return (
                <Item
                  onPostChange={setUpdatePosts}
                  updatePosts={updatePosts}
                  userId={userId}
                  postType={isDonationList ? "donations" : "requests"}
                  isMyPost={true}
                  item={item}
                  key={item.id}
                />
              );
            })}
      </main>
      <footer>
        Made by <a href="https://coff.ee/maheshbachu"> Mahesh Bachu</a>
      </footer>
    </div>
  );
}

export default MyPosts;
