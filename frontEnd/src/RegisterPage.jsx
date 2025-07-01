import "./App.css";
//main page layout for the page
function RegisterPage() {
  const itemsPage = `${import.meta.env.VITE_BASE_URL}items`;
  const mainPage = `${import.meta.env.VITE_BASE_URL}`;
  const backendUrl = import.meta.env.VITE_BACKEND;

  const registerFunc = async (event) => {
    event.preventDefault();
    const formData = new FormData(document.getElementById("register"));
    let readableData = Object.fromEntries(formData);
    const response = await fetch(`${backendUrl}signUp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(readableData),
    });
  };

  return (
    <div>
      <header>
        <nav>
          <a href={mainPage}> Home</a>
        </nav>
        <h1>Register</h1>
      </header>
      <main>
        <form
          id="register"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <a href={itemsPage}>Sign in with Google</a>
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
          <button type="submit" onClick={registerFunc}>
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

export default RegisterPage;
