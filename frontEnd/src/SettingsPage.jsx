import "./App.css";
import Navigation from "./components/nav";
//main page layout for the page
function SettingsPage() {
  return (
    <div>
      <header>
        <Navigation />
        <h1>Settings</h1>
      </header>
      <main>
        <div id="edits" style={{ display: "grid", gridTemplateColumns:"10% 70% 20%", rowGap: "12px", columnGap: "12px", gridTemplateRows: "30px 30px"}}>
            <label className="optionLabel" htmlFor="username">Username</label>
            <input type="text" name="username" id="username"></input>
            <button className="settingsButton">Submit</button>

            <label className="optionLabel" htmlFor="email">Email</label>
            <input type="text" name="email" id="email"></input>
            <button className="settingsButton">Submit</button>

            <label className="optionLabel" htmlFor="name">Name</label>
            <input  type="text" name="name" id="name"></input>
            <button className="settingsButton">Submit</button>

            <label className="optionLabel" htmlFor="phoneNumber">Phone Number</label>
            <input type="text" name="phoneNumber" id="phoneNumber"></input>
            <button className="settingsButton">Submit</button>

            <label className="optionLabel" htmlFor="homeAddress">Home Address</label>
            <input type="text" name="homeAddress" id="homeAddress"></input>
            <button className="settingsButton">Submit</button>

            <label className="optionLabel" htmlFor="meetAddress">Preffered Meet Location</label>
            <input type="text" name="meetAddress" id="meetAddress"></input>
            <button className="settingsButton">Submit</button>
        </div>
      </main>
    </div>
  );
}

export default SettingsPage;
