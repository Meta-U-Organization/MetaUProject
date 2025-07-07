import { useState } from "react";
import "./App.css";
import Item from "./components/item";
import Navigation from "./components/nav";
import { Context } from "./App";
import { useContext } from "react";
import { useEffect } from "react";
//This page will use a session to store user Id and will be specific to them, this is a base implimentation
function MyPosts() {
  const backendUrl = useContext(Context).backendUrl;
  const [isDonationList, setIsDonationList] = useState(true);
  const [updatePosts, setUpdatePosts] = useState(true);
  const [donationList, setDonationList] = useState([]);
  const [requestList, setRequestList] = useState([]);
  const user = useContext(Context).user;

  const changeItemType = () => {
    if (isDonationList) {
      document.getElementById("changeItemButton").innerHTML = "Go to Donations";
    } else {
      document.getElementById("changeItemButton").innerHTML = "Go to Requests";
    }
    setIsDonationList(!isDonationList);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const currentUser = await fetch(`${backendUrl}users/${user.id}`);
      const currentUserValues = await currentUser.json();
      setDonationList(currentUserValues.donationPosts);
      setRequestList(currentUserValues.requestPosts);
    };
    fetchPosts();
  }, [updatePosts, isDonationList]);

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
          ? donationList.map((item) => {
              return (
                <Item
                  onPostChange={setUpdatePosts}
                  updatePosts={updatePosts}
                  userId={user.id}
                  postType={isDonationList ? "donations" : "requests"}
                  isMyPost={true}
                  item={item}
                  key={item.id}
                />
              );
            })
          : requestList.map((item) => {
              return (
                <Item
                  onPostChange={setUpdatePosts}
                  updatePosts={updatePosts}
                  userId={user.id}
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
