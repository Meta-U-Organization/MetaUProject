import { useContext, useState } from "react";
import "./App.css";
import Item from "./components/item";
import Navigation from "./components/nav";
import { useEffect } from "react";
import useAllDonations from "./utils/useAllDonations";
import { Context } from "./App";
import useAllRequests from "./utils/useAllRequests";
//main page layout for the page
function DonationAndRequestPage() {
  const [isDonationItem, setIsDonationItem] = useState(true);
  const signedInUser = useContext(Context).user.id;
  const { fetchAllDonations, donations, loading, errorMsg } = useAllDonations();
  const { fetchAllRequests, requests, loadingRequests } = useAllRequests();
  const changeItemType = () => {
    if (isDonationItem) {
      document.getElementById("changeItemButton").innerHTML = "Go to Donations";
    } else {
      document.getElementById("changeItemButton").innerHTML = "Go to Requests";
    }
    setIsDonationItem(!isDonationItem);
  };

  useEffect(() => {
    fetchAllDonations(signedInUser);
    fetchAllRequests();
  }, []);

  return (
    <div>
      <header>
        <Navigation />
        <h1>Items in Your Area</h1>
        <div>
          <button title="Change Post Type" class="changeItemButton" onClick={changeItemType}>
            Go to Requests
          </button>
          <span className="customToolTip">Change Post Type</span>
        </div>
      </header>
      <main>
        {errorMsg ? (
          <h3>{errorMsg}</h3>
        ) : loading ? (
          <h1>Loading...</h1>
        ) : isDonationItem ? (
          donations?.map((item) => {
            if (item.userId !== signedInUser) {
              return (
                <Item
                  postType={"donations"}
                  item={item}
                  userId={item.userId}
                  key={item.id}
                />
              );
            }
          })
        ) : loadingRequests ? (
          <h3>Loading...</h3>
        ) : (
          requests?.map((item) => {
            if (item.userId !== signedInUser) {
              return (
                <Item
                  postType={"requests"}
                  item={item}
                  userId={item.userId}
                  key={item.id}
                />
              );
            }
          })
        )}
      </main>
      <footer>
        Made by <a href="https://coff.ee/maheshbachu"> Mahesh Bachu</a>
      </footer>
    </div>
  );
}

export default DonationAndRequestPage;
