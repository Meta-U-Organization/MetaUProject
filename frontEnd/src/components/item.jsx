//Item framework
import { useContext, useEffect, useRef, useState } from "react";
import useDeleteItem from "../utils/useDeleteItem";
import useEditItem from "../utils/useEditItem";
import useCreatePossibleRecipient from "../utils/useCreatePossibleRecipient";
import useAllPossibleRecipients from "../utils/useAllPossibleRecipients";
import useOrderedPossibleRecipients from "../utils/useOrderedPossibleRecipients";
import { Context } from "../App";

function Item({ postType, userId, isMyPost, item, onPostChange }) {
  const itemRef = useRef(null);
  const signedInUser = useContext(Context).user.id;
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const { fetchDelete } = useDeleteItem(userId, postType, item.id);
  const { fetchEdit } = useEditItem(userId, postType, item.id);
  const { fetchCreatePossibleRecipient } = useCreatePossibleRecipient(
    item.userId,
    item.id
  );

  const { fetchAllPossibleRecipients, possibleRecipients } =
    useAllPossibleRecipients(userId, item.id);
  const { fetchOrderedPossibleRecipients, orderedRecipients } =
    useOrderedPossibleRecipients(userId, item.id);

  useEffect(() => {
    for (let i = 0; i < possibleRecipients?.length; i++) {
      if (possibleRecipients[i].userId === signedInUser) {
        setRequestSubmitted(true);
      }
    }
  }, [possibleRecipients]);

  useEffect(() => {
    fetchAllPossibleRecipients();
    fetchOrderedPossibleRecipients();
  }, []);
  /*This function is called when we want to delete an item from the list*/
  const deleteItem = async (event) => {
    event.preventDefault();
    await fetchDelete();
    onPostChange();
  };

  /*function to edit an item, will grab certain values and send a put to the server */
  const postItemEdits = async (event) => {
    event.preventDefault();
    const parentItem = itemRef.current;
    const description = parentItem.querySelector("#description").value;
    const title = parentItem.querySelector("#title").value;
    const itemState = parentItem.querySelector("#useStates").value;

    if (title !== "" && description !== "") {
      fetchEdit(
        JSON.stringify({
          id: item.id,
          title: title,
          description: description,
          photo: "",
          itemState: itemState,
          userId: userId,
        })
      );
      parentItem.querySelector("#title").placeholder =
        parentItem.querySelector("#title").value;
      parentItem.querySelector("#title").value = "";
      parentItem.querySelector("#description").placeholder =
        parentItem.querySelector("#description").value;
      parentItem.querySelector("#description").value = "";
    } else {
      alert("Missing Title or Desciption");
    }
  };

  const requestItem = (event) => {
    event.preventDefault();
    const parentItem = itemRef.current;
    const wantScore = parentItem.querySelector(".wantScore").value;
    const distance = item.distance.match(/\d{1,3}(?:,\d{3})*(?:\.\d+)?/g);
    const finalDistance = distance[0].replace(",", "");
    fetchCreatePossibleRecipient(
      JSON.stringify({
        Distance: parseInt(finalDistance),
        wantScore: parseInt(wantScore),
      })
    );
    setRequestSubmitted(true);
  };

  return (
    <div
      style={{ border: "1px solid black", display: "flex", marginTop: "20px" }}
      ref={itemRef}
    >
      <div style={{ width: "44%", marginLeft: "6%" }}>
        {isMyPost ? (
          <div>
            <div>
              <label htmlFor="title">Title: </label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder={item.title}
              ></input>
            </div>
            <label htmlFor="description">Description: </label>
            <input
              name="description"
              id="description"
              type="text"
              placeholder={item.description}
            ></input>
            <br></br>
            <select name="useState" id="useStates" defaultValue={item.useState}>
              <option value="Used Like New">Used Like New</option>
              <option value="Used">Used</option>
              <option value="New">New</option>
            </select>
            <div>
              <button onClick={postItemEdits}>Submit Edits</button>
              <button onClick={deleteItem}>Delete</button>
            </div>
          </div>
        ) : (
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
        )}
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
