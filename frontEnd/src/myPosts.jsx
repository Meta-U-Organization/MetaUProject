import { useState } from "react";
import "./App.css";
import MyItem from "./components/myItem.jsx";
import Navigation from "./components/nav";
import { Context } from "./App";
import { useContext } from "react";
import { useEffect } from "react";
import useMyPosts from "./utils/useMyPosts.js";

//This page will use a session to store user Id and will be specific to them, this is a base implimentation
function MyPosts() {
  const { signedInUser } = useContext(Context);
  const { fetchMyPosts, donations, requests, loading } = useMyPosts(signedInUser.id);
  const [isDonationList, setIsDonationList] = useState(true);

  const changeItemType = () => {
    if (isDonationList) {
      document.getElementById("changeItemButton").innerHTML = "Go to Donations";
    } else {
      document.getElementById("changeItemButton").innerHTML = "Go to Requests";
    }
    setIsDonationList(!isDonationList);
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  return (
    <div>
      <header>
        <Navigation />
        <h1>My Posts</h1>
        <button  title="Change Post Type" id="changeItemButton" onClick={changeItemType}>
          Go to Requests
        </button>
      </header>
      <main>
        {loading ? (
          <h1>Loading...</h1>
        ) : isDonationList ? (
          donations?.map((item) => {
            return (
              <MyItem
                onPostChange={() => {
                  fetchMyPosts();
                }}
                userId={signedInUser.id}
                postType="donations"
                item={item}
                key={item.id}
              />
            );
          })
        ) : (
          requests?.map((item) => {
            return (
              <MyItem
                onPostChange={() => {
                  fetchMyPosts();
                }}
                userId={user.id}
                postType="requests"
                item={item}
                key={item.id}
              />
            );
          })
        )}
      </main>
    </div>
  );
}

export default MyPosts;
