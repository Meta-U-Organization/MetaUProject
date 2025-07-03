import { useState } from "react";
import "./App.css";
import Item from "./components/item";
import Navigation from "./components/nav";
import { Context } from "./App";
import { useContext } from "react";
//This page will use a session to store user Id and will be specific to them, this is a base implimentation
function MyPosts() {
  const [isDonationList, setIsDonationList] = useState(true);
  const [updatePosts, setUpdatePosts] = useState(true);
  const userId = useContext(Context).userId;
  const user = useContext(Context).user;

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
