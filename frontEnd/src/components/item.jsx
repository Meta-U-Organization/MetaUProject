//Item framework
function Item({
  postType,
  postId,
  userId,
  isMyPost,
  title,
  description,
  useState,
  postOnChange,
  updatePosts,
}) {
  const backendUrl = import.meta.env.VITE_BACKEND;
  const deleteItem = async (event) => {
    event.preventDefault();
    console.log(`${backendUrl}users/${userId}/${postType}/${postId}`);
    const response = await fetch(
      `${backendUrl}users/${userId}/${postType}/${postId}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    await postOnChange(!updatePosts);
  };
  if (document.getElementById("useStates")) {
    document.getElementById("useStates").value = useState;
  }
  return (
    <div
      style={{ border: "1px solid black", display: "flex", marginTop: "20px" }}
    >
      <div style={{ width: "44%", marginLeft: "6%" }}>
        {isMyPost ? (
          <input type="text" placeholder={title}></input>
        ) : (
          <h2>{title}</h2>
        )}

        {isMyPost ? (
          <input type="text" placeholder={description}></input>
        ) : (
          <p>{description}</p>
        )}
        <p>
          Use State:
          {isMyPost ? (
            <select name="useState" id="useStates">
              <option value="Used Like New">Used Like New</option>
              <option value="Used">Used</option>
              <option value="New">New</option>
            </select>
          ) : (
            ` ${useState}`
          )}
        </p>
        {isMyPost && <button onClick={deleteItem}>Submit Edits</button>}
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
