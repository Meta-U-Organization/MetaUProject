//Item framework
function Item() {
  return (
    <div
      style={{ border: "1px solid black", display: "flex", marginTop: "20px" }}
    >
      <div style={{ width: "44%", marginLeft: "6%" }}>
        <h2>Item Title</h2>
        <p>
          Description, dolor sit amet consectetur adipisicing elit. Veritatis
          ducimus ex ratione, quis sed facilis eveniet, fuga vitae placeat illum
          porro repellat ad! Reiciendis earum aut ad, nulla maxime incidunt.
        </p>
        <p>Use State: Like New</p>
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
