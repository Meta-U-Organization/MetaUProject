//Item framework
import React, { useRef } from "react";
function Item({
  postType,
  postId,
  userId,
  isMyPost,
  title,
  description,
  useState,
  onPostChange,
  updatePosts,
}) {
  const itemRef = useRef(null);
  const backendUrl = import.meta.env.VITE_BACKEND;

  const deleteItem = async (event) => {
    event.preventDefault();
    const response = await fetch(
      `${backendUrl}users/${userId}/${postType}/${postId}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    onPostChange(!updatePosts);
  };

  const editItem = async (event) => {
    event.preventDefault();
    const parentItem = itemRef.current;
    const description = parentItem.querySelector("#description").value;
    const title = parentItem.querySelector("#title").value;
    const useState = parentItem.querySelector("#useStates").value;

    if (title !== "" && description !== "") {
      const response = await fetch(
        `${backendUrl}users/${userId}/${postType}/${postId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: postId,
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
      alert("Missing title or");
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
            <label htmlFor="title">Title: </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder={title}
            ></input>
          </div>
        ) : (
          <h2>{title}</h2>
        )}

        {isMyPost ? (
          <div>
            <label htmlFor="description">Description: </label>
            <input
              name="description"
              id="description"
              type="text"
              placeholder={description}
            ></input>
          </div>
        ) : (
          <p>{description}</p>
        )}
        <p>
          Use State:
          {isMyPost ? (
            <select name="useState" id="useStates" defaultValue={useState}>
              <option value="Used Like New">Used Like New</option>
              <option value="Used">Used</option>
              <option value="New">New</option>
            </select>
          ) : (
            ` ${useState}`
          )}
        </p>
        {isMyPost && <button onClick={editItem}>Submit Edits</button>}
        {isMyPost && <button onClick={deleteItem}>Delete</button>}
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
