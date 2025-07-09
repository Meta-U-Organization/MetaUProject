import { useContext, useEffect, useState } from "react";
import "./App.css";
import { Context } from "./App";
import useCCFetch from "./utils/utils";
//main page layout for the page
function SignUpPage() {
  const { backendUrl } = useContext(Context);
  const [trig, setTrig] = useState(1);
  const { fetchData, errorType, errorMsg } = useCCFetch();

  useEffect(() => {
    if (trig === 1) {
      return;
    } else if (errorType) {
      alert(errorMsg);
    } else {
      alert("Registration Complete, proceed to login page");
    }
  }, [trig]);

  const signUpFunc = async (event) => {
    event.preventDefault();
    const formData = new FormData(document.getElementById("signUpForm"));
    let readableData = Object.fromEntries(formData);
    fetchData(`${backendUrl}/signUp`, "POST", JSON.stringify(readableData));
    setTrig(trig + 1);
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
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            placeholder="Enter your Address"
          ></input>
          <button type="submit" onClick={signUpFunc}>
            Submit
          </button>
        </form>
      </main>
      <footer>
        Made by <a href="https://coff.ee/maheshbachu"> Mahesh Bachu</a>
      </footer>
    </div>
  );
}

export default SignUpPage;
