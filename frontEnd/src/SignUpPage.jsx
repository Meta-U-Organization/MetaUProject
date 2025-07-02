import "./App.css";
//main page layout for the page
function SignUpPage() {
  const loginPage = `${import.meta.env.VITE_BASE_URL}login`;
  const backendUrl = import.meta.env.VITE_BACKEND;

  const signUpFunc = async (event) => {
    event.preventDefault();
    const formData = new FormData(document.getElementById("signUpForm"));
    let readableData = Object.fromEntries(formData);
    const response = await fetch(`${backendUrl}signUp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(readableData),
    });

    const result = await response.json();
    if (result.message === "Sign Up Succesful!") {
      alert("Registration Complete, proceed to login page");
    } else if (result.message === "Username and password are required.") {
      alert("Username and password are required.");
    } else if (result.message === "Username already taken.") {
      alert("Username already taken.");
    } else if (result.message === "Email already in use.") {
      alert("Email already in use.");
    }
  };

  return (
    <div>
      <header>
        <nav>
          <a href={loginPage}> Login</a>
        </nav>
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
