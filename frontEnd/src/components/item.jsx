//Item framework
import { useContext, useEffect, useRef, useState } from "react";
import useCreatePossibleRecipient from "../utils/useCreatePossibleRecipient";
import useAllPossibleRecipients from "../utils/useAllPossibleRecipients";
import { Context } from "../App";
import { socket } from "../utils/socket";

function Item({ postType, userId, item }) {
  const itemRef = useRef(null);
  const signedInUser = useContext(Context).user;
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const { fetchCreatePossibleRecipient } = useCreatePossibleRecipient(
    item.userId,
    item.id
  );
  const { fetchAllPossibleRecipients, possibleRecipients } =
    useAllPossibleRecipients(userId, item.id);

  useEffect(() => {
    for (let i = 0; i < possibleRecipients?.length; i++) {
      if (possibleRecipients[i].userId === signedInUser.id) {
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
        wantScore: wantScore,
        type:"New Request for Donation Item",
        description: `${signedInUser.username} requests your item titled: ${item.title}`,
        possibleRecipientId: signedInUser.id,
      })
    );

    socket.emit("requestSubmitted", {userId: item.userId, type : "New Request for Donation Item", description: `${signedInUser.username} requests your item titled: ${item.title}`})

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
      style={{ border: "2px solid white", borderRadius:"15px",
         display: "flex", justifyContent:"center", marginTop: "20px" }}
      ref={itemRef}
    >
      <div>
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
                <option value="1 - Would be cool to have">1 - Would be cool to have</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5 - I NEED IT!!!!">5 - I NEED IT!!!!</option>
              </select>
              <br></br>
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

    </div>
  );
}

export default Item;
