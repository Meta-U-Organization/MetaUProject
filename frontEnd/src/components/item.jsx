//Item framework
import { useContext, useEffect, useRef } from "react";
import useDistance from "../utils/useDistance";
import { Context } from "../App";
import usePreferredMeetLocation from "../utils/usePreferredMeetLocation";

function Item({ postType, userId, isMyPost, item, onPostChange }) {
  const itemRef = useRef(null);
  const signedInUserAddress = useContext(Context).user.address;
  const { fetchDistance, distance, errorMsg } = useDistance();

  const { fetchPreferredMeetLocation, meetLocation } =
    usePreferredMeetLocation(userId);

  useEffect(() => {
    if (signedInUserAddress && meetLocation) {
      fetchDistance(
        JSON.stringify({
          origin: signedInUserAddress,
          destination: meetLocation,
        })
      );
    }
  }, [meetLocation]);

  useEffect(() => {
    fetchPreferredMeetLocation();
  }, []);

  return (
    <div
      style={{ border: "1px solid black", display: "flex", marginTop: "20px" }}
      ref={itemRef}
    >
      <div style={{ width: "44%", marginLeft: "6%" }}>
        <div>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          <p>Use State: {item.itemState}</p>
          <p>Distance: {distance ? distance : errorMsg}</p>
          {postType === "donations" && (
            <form>
              <label style={{ marginLeft: "10px" }} htmlFor="wantScore">
                Want Score:{" "}
              </label>
              <select name="wantScore">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
              <button style={{ marginTop: "10px", marginBottom: "10px" }}>
                Request Item
              </button>
            </form>
          )}
        </div>
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
