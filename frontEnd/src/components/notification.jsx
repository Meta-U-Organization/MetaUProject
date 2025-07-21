
function Notification({title, description}) {
  return (
    <div style={{ border: "2px solid white", borderRadius:"15px", marginTop: "20px" }}>
      <h2>{title}</h2>
      <h3>{description}</h3>
    </div>
  );
}

export default Notification;
