import "./App.css";
import useSignup from "./utils/useSignup";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
  const { fetchSignup, errorType, errorMsg, confirmMessage } = useSignup();
  const navigate = useNavigate();
  const signUpFunc = async (event) => {
    event.preventDefault();
    const formData = new FormData(document.getElementById("signUpForm"));
    let readableData = Object.fromEntries(formData);
    await fetchSignup(JSON.stringify(readableData));
  };

  const goToSignIn = (event) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <div>
      <header>
        <h1>Register</h1>
      </header>
      <main>
        <form
          id="signUpForm"
          style={{ display: "flex", flexDirection: "column" }}
        >
          {errorMsg !== null && <h3>{errorMsg}</h3>}
          {confirmMessage != null && (
            <div>
              <h3>{confirmMessage}</h3>
              <button onClick={goToSignIn}>Please Proceed to Login</button>
            </div>
          )}
          <label htmlFor="username">Username</label>
          <input type="text" name="username" placeholder="Username"></input>
          <label htmlFor="password">Password</label>
          <input
            type="text"
            name="password"
            placeholder="Enter your password"
          ></input>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            placeholder="Enter your email"
          ></input>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" placeholder="Enter your name"></input>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Enter your Phone Number"
          ></input>
          <label htmlFor="address">Home Address</label>
          <input
            type="text"
            name="address"
            placeholder="Enter your Address"
          ></input>
          <label htmlFor="preferredMeetLocation">Preferred Meet Location</label>
          <input
            type="text"
            name="preferredMeetLocation"
            placeholder="Enter your preferred meet location"
          ></input>
          <label htmlFor="preferredMeetTime">Preferred Meet Time</label>
          <select name="preferredMeetTime">
            <option value={"Morning"}>Morning</option>
            <option value={"Afternoon"}>Afternoon</option>
            <option value={"Evening"}>Evening</option>
          </select>
          <button type="submit" onClick={signUpFunc}>
            Submit
          </button>
        </form>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Already have An Account?
        </button>
      </main>
    </div>
  );
}

export default SignUpPage;
