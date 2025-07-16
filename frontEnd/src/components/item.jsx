//Item framework
import { useContext, useEffect, useRef, useState } from "react";
import useCreatePossibleRecipient from "../utils/useCreatePossibleRecipient";
import useAllPossibleRecipients from "../utils/useAllPossibleRecipients";
import { Context } from "../App";

function Item({ postType, userId, item }) {
  const itemRef = useRef(null);
  const signedInUser = useContext(Context).user.id;
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const { fetchCreatePossibleRecipient } = useCreatePossibleRecipient(
    signedInUser,
    item.id
  );

  const { fetchAllPossibleRecipients, possibleRecipients } =
    useAllPossibleRecipients(userId, item.id);

  useEffect(() => {
    for (let i = 0; i < possibleRecipients?.length; i++) {
      if (possibleRecipients[i].userId === signedInUser) {
        setRequestSubmitted(true);
      }
    }
  }, [possibleRecipients]);

  const requestItem = (event) => {
    event.preventDefault();
    const parentItem = itemRef.current;
    const wantScore = parentItem.querySelector(".wantScore").value;
    fetchCreatePossibleRecipient(
      JSON.stringify({
        Distance: item.distance,
        wantScore: parseInt(wantScore),
      })
    );
    setRequestSubmitted(true);
  };

  useEffect(() => {
    for (let i = 0; i < possibleRecipients?.length; i++) {
      if (possibleRecipients[i].userId === signedInUser) {
        setRequestSubmitted(true);
      }
    }
  }, [possibleRecipients]);

  useEffect(() => {
    fetchAllPossibleRecipients();
  }, []);

  return (
    <div
      style={{ border: "1px solid black", display: "flex", marginTop: "20px" }}
      ref={itemRef}
    >
      <div style={{ width: "44%", marginLeft: "6%" }}>
        <div>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          <p>Use State: {item.itemState}</p>
          {postType == "donations" && (
            <p className="distance">Distance: {item.distance}</p>
          )}

          {postType === "donations" && (
            <form className="requestItemForm">
              <label style={{ marginLeft: "10px" }} htmlFor="wantScore">
                Want Score:{" "}
              </label>
              <select className="wantScore" name="wantScore">
                <option value="1">1 - Would be cool to have</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5 - I NEED IT!!!!</option>
              </select>
              {requestSubmitted ? (
                <h3>Request has been submitted</h3>
              ) : (
                <button
                  onClick={requestItem}
                  style={{ marginTop: "10px", marginBottom: "10px" }}
                >
                  Request Item
                </button>
              )}
            </form>
          )}
        </div>
      </div>
      <div style={{ width: "44%" }}>
        <img
          style={{ width: "100%", maxWidth: "300px" }}
          src="https://thumbs.dreamstime.com/b/temporary-rubber-stamp-over-white-background-86664158.jpg"
        ></img>
      </div>
    </div>
  );
}

export default Item;
