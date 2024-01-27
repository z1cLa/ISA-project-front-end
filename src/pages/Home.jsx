import "./Home.css"

function Home({loggedUser}) {
  
  console.log("ROLA BAJO:", loggedUser?.roles[0].name);
  return (
    <div>
      <div className="App">
        <main className="App-main">
          <h2>Welcome to Gringos!</h2>
          <p>Your favorite place for all things Mexican.</p>
        </main>
        {loggedUser?.roles[0].name.includes('ROLE_ADMIN') && (
            <p>This content is only visible to admins.</p>
          )}

        <footer className="footer">
          <p>© 2024 - All rights reserved</p>
        </footer>
      </div>
    </div>
  );
}

export default Home;