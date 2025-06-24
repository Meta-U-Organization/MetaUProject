import "./App.css";
//main page layout for the page
function LoginPage() {
  const itemsPage = `${import.meta.env.VITE_BASE_URL}items`;
  const mainPage = `${import.meta.env.VITE_BASE_URL}`;
  return (
    <div>
      <header>
        <nav>
          <a href={mainPage}> Home</a>
        </nav>
        <h1>Login</h1>
      </header>
      <main>
        <form style={{ display: "flex", flexDirection: "column" }}>
          <a href={itemsPage}>Sign in with Google</a>
          <label htmlFor="emailAddress">Email Address</label>
          <input type="text" placeholder="name@email.com"></input>
          <label htmlFor="password">Email Address</label>
          <input type="text" placeholder="Enter your password"></input>
        </form>
      </main>
      <footer>
        Made by <a href="https://coff.ee/maheshbachu"> Mahesh Bachu</a>
      </footer>
    </div>
  );
}

export default LoginPage;
