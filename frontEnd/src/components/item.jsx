//Item framework
import React, { useRef } from "react";
function Item({ postType, userId, isMyPost, item, onPostChange, updatePosts }) {
  //consts needed through this element
  const itemRef = useRef(null);
  const backendUrl = import.meta.env.VITE_BACKEND;

  /*This function is called when we want to delete an item from the list*/
  const deleteItem = async (event) => {
    event.preventDefault();
    const response = await fetch(
      `${backendUrl}users/${userId}/${postType}/${item.id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    onPostChange(!updatePosts);
  };
  /*function to edit an item, will grab certain values and send a put to the server */
  const editItem = async (event) => {
    event.preventDefault();
    const parentItem = itemRef.current;
    const description = parentItem.querySelector("#description").value;
    const title = parentItem.querySelector("#title").value;
    const useState = parentItem.querySelector("#useStates").value;

    if (title !== "" && description !== "") {
      const response = await fetch(
        `${backendUrl}users/${userId}/${postType}/${item.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: item.id,
            title: title,
            description: description,
            photo: "",
            useState: useState,
            userId: userId,
          }),
        }
      );
      parentItem.querySelector("#title").placeholder =
        parentItem.querySelector("#title").value;
      parentItem.querySelector("#title").value = "";
      parentItem.querySelector("#description").placeholder =
        parentItem.querySelector("#description").value;
      parentItem.querySelector("#description").value = "";
    } else {
      alert("Missing title or Desciption");
    }
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
              <button onClick={editItem}>Submit Edits</button>
              <button onClick={deleteItem}>Delete</button>
            </div>
          </div>
        ) : (
          <div>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <p>Use State: {item.useState}</p>
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
