//Item framework
import { useRef } from "react";
import useDeleteItem from "../utils/useDeleteItem";
import useEditItem from "../utils/useEditItem";

function Item({ postType, userId, isMyPost, item, onPostChange }) {
  const itemRef = useRef(null);
  const { fetchDelete } = useDeleteItem(userId, postType, item.id);
  const { fetchEdit } = useEditItem(userId, postType, item.id);

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
            {postType == "donations" && <p>Distance: {item.distance}</p>}

            {postType === "donations" && (
              <form>
                <label style={{ marginLeft: "10px" }} htmlFor="wantScore">
                  Want Score:{" "}
                </label>
                <select name="wantScore">
                  <option value="1">1 - Would be cool to have</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5 - I NEED IT!!!!</option>
                </select>
                <button style={{ marginTop: "10px", marginBottom: "10px" }}>
                  Request Item
                </button>
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
