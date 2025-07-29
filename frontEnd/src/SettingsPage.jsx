import { useContext } from "react";
import "./App.css";
import Navigation from "./components/nav";
import { Context } from "./App";
//main page layout for the page
function SettingsPage() {
  const { signedInUser } = useContext(Context);
  console.log(signedInUser);
  return (
    <div>
      <header>
        <Navigation />
        <h1>Settings</h1>
      </header>
      <main>
        <div id="edits" style={{ display: "grid", gridTemplateColumns:"10% 70% 20%", rowGap: "12px", columnGap: "12px", gridTemplateRows: "30px 30px"}}>
            <label className="optionLabel" htmlFor="username">Username</label>
            <input type="text" name="username" id="username" placeholder={signedInUser.username}></input>
            <button className="settingsButton">Submit</button>

            <label className="optionLabel" htmlFor="email">Email</label>
            <input type="text" name="email" id="email" placeholder={signedInUser.email}></input>
            <button className="settingsButton">Submit</button>

            <label className="optionLabel" htmlFor="name">Name</label>
            <input  type="text" name="name" id="name" placeholder={signedInUser.name}></input>
            <button className="settingsButton">Submit</button>

            <label className="optionLabel" htmlFor="phoneNumber">Phone Number</label>
            <input type="text" name="phoneNumber" id="phoneNumber" placeholder={signedInUser.phoneNumber}></input>
            <button className="settingsButton">Submit</button>

            <label className="optionLabel" htmlFor="homeAddress">Home Address</label>
            <input type="text" name="homeAddress" id="homeAddress" placeholder={signedInUser.address}></input>
            <button className="settingsButton">Submit</button>

            <label className="optionLabel" htmlFor="meetAddress">Preffered Meet Location</label>
            <input type="text" name="meetAddress" id="meetAddress" placeholder={signedInUser.preferredMeetLocation}></input>
            <button className="settingsButton">Submit</button>
        </div>
      </main>
    </div>
  );
}

export default SettingsPage;
