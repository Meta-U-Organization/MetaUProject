//Item framework
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
  return (
    <div
      style={{ border: "1px solid black", display: "flex", marginTop: "20px" }}
    >
      <div style={{ width: "44%", marginLeft: "6%" }}>
        <h2>{title}</h2>
        <p>{description}</p>
        <p>Use State: {useState}</p>
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
