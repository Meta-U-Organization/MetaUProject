//Item framework
import { useEffect, useRef, useState } from "react";
import "./myItem.css";
import useDeleteItem from "../utils/useDeleteItem";
import useEditItem from "../utils/useEditItem";
import useOrderedPossibleRecipients from "../utils/useOrderedPossibleRecipients";
import useUpdateSelected from "../utils/useUpdateSelected";

function MyItem({ postType, userId, item, onPostChange }) {
  const itemRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [loadRemaining, setLoadRemaining] = useState(false);
  const [noUserSelected, setNoUserSelected] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const { fetchDelete } = useDeleteItem(userId, postType, item.id);
  const { fetchEdit } = useEditItem(userId, postType, item.id);
  const { fetchUpdateSelected, updateSelectedError } = useUpdateSelected();

  const {
    fetchOrderedPossibleRecipients,
    topThreeRecipients,
    remainingRecipients,
  } = useOrderedPossibleRecipients(userId, item.id);

  useEffect(() => {
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

  const fulfill = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  const turnModalOff = () => {
    setNoUserSelected(false);
    setLoadRemaining(false);
    setShowModal(false);
  };

  const loadMore = () => {
    setLoadRemaining(true);
  };

  const onlyOneSelected = (clickedId) => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      if (parseInt(checkbox.id) !== clickedId) {
        checkbox.checked = false;
      }
    });
    setSelectedRecipient(clickedId);
  };

  const selectRecipient = async (event) => {
    event.preventDefault();
    if (selectedRecipient === null) {
      setNoUserSelected(true);
      return;
    }
    await fetchUpdateSelected(
      JSON.stringify({
        selectedId: selectedRecipient,
        donorId: item.userId,
      })
    );

    if (!updateSelectedError) {
      setShowModal(false);
      await fetchDelete();
      onPostChange();
    }
  };

  return (
    <div
      style={{ border: "1px solid black", display: "flex", justifyContent:"center", marginTop: "20px" }}
      ref={itemRef}
    >
      <div>
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
          {topThreeRecipients?.length !== 0 && (
            <button onClick={fulfill}>Choose a Recipient</button>
          )}
        </div>
      </div>
      {showModal && (
        //modal that hosts functionality to make a card
        <div id="selectRecipientModal" className="modal">
          <div
            className="modal-content"
            style={{
              display: "flex",
              flexDirection: "column",
              maxHeight: "80%",
              overflowY: "scroll",
            }}
          >
            <button onClick={turnModalOff}>X</button>
            <h2>Top Three Possible Recipients</h2>
            {topThreeRecipients?.map((rec) => {
              return (
                <div key={rec.id} className="recipientOption">
                  <div>
                    <p>User Name: {rec.username}</p>
                    <p>Name: {rec.name}</p>
                    <p>email: {rec.email}</p>
                    <p>Phone Number: {rec.phoneNumber}</p>
                    <p>Distance: {rec.Distance}</p>
                  </div>
                  <label htmlFor="selectedRecipient">Select</label>
                  <input
                    type="checkbox"
                    id={rec.userId}
                    name="selectedRecipient"
                    onChange={() => {
                      onlyOneSelected(rec.userId);
                    }}
                  ></input>
                </div>
              );
            })}
            {loadRemaining && (
              <div>
                <h2>Other Possible Recipients</h2>
                {remainingRecipients?.map((rec) => {
                  return (
                    <div key={rec.id} className="recipientOption">
                      <div>
                        <p>User Name: {rec.username}</p>
                        <p>Name: {rec.name}</p>
                        <p>email: {rec.email}</p>
                        <p>Phone Number: {rec.phoneNumber}</p>
                        <p>Distance: {rec.Distance}</p>
                      </div>
                      <label htmlFor="selectedRecipient">Select</label>
                      <input
                        type="checkbox"
                        id={rec.userId}
                        name="selectedRecipient"
                        onChange={() => {
                          onlyOneSelected(rec.userId);
                        }}
                      ></input>
                    </div>
                  );
                })}
              </div>
            )}
            {remainingRecipients?.length > 0 && (
              <button onClick={loadMore}>Load Remaining</button>
            )}
            {noUserSelected && <h3 id="notSelected">No user Selected</h3>}
            <button onClick={selectRecipient}>Select Recipient</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyItem;
