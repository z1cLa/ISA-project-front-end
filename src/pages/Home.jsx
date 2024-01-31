import "./Home.css"
import { Link} from "react-router-dom";

function Home({loggedUser}) {
  
 // const ime = loggedUser.first_name;

  return (
    <div>
      <div className="App">
        <main className="App-main">
        {!loggedUser && (
        <div>
          <h2>Welcome to Gringos!</h2>
          <p>Your favorite place for all things Mexican.</p>
        </div>
        )}
        </main>
        {loggedUser?.roles[0].name.includes('ROLE_ADMIN') && (
         
          <div className="adminContainer">
             <Link className="linkk" to="/company-reservations-user-list">
          <div class="cardd">
              <h3 class="cardd__title">List of customers
              </h3>
              <p class="cardd__content">A list of all registered users who reserved equipment in that company. </p>
              <div class="cardd__arrow">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="15" width="15">
                      <path fill="#fff" d="M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.3232 13.2374C21.0066 12.554 21.0066 11.446 20.3232 10.7626L14.5303 4.96967C14.2374 4.67678 13.7626 4.67678 13.4697 4.96967C13.1768 5.26256 13.1768 5.73744 13.4697 6.03033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L13.4697 17.9697Z"></path>
                  </svg>
              </div>
          </div>
          </Link>

          <Link className="linkk" to="/taking-equipment">
          <div class="cardd">
              <h3 class="cardd__title">Equipment information
              </h3>
              <p class="cardd__content">A page for entering information about taking equipment. </p>
              <div class="cardd__arrow">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="15" width="15">
                      <path fill="#fff" d="M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.3232 13.2374C21.0066 12.554 21.0066 11.446 20.3232 10.7626L14.5303 4.96967C14.2374 4.67678 13.7626 4.67678 13.4697 4.96967C13.1768 5.26256 13.1768 5.73744 13.4697 6.03033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L13.4697 17.9697Z"></path>
                  </svg>
              </div>
          </div>
          </Link>

          <Link className="linkk" to="/company-reservations">
          <div class="cardd">
              <h3 class="cardd__title">Work calendar
              </h3>
              <p class="cardd__content">A list of all reservations in your company. </p>
              <div class="cardd__arrow">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="15" width="15">
                      <path fill="#fff" d="M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.3232 13.2374C21.0066 12.554 21.0066 11.446 20.3232 10.7626L14.5303 4.96967C14.2374 4.67678 13.7626 4.67678 13.4697 4.96967C13.1768 5.26256 13.1768 5.73744 13.4697 6.03033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L13.4697 17.9697Z"></path>
                  </svg>
              </div>
          </div>
          </Link>

          <Link className="linkk" to="/add-appointment">
          <div class="cardd">
              <h3 class="cardd__title">Add appointment
              </h3>
              <p class="cardd__content">Page for scheduling a new appointment. </p>
              <div class="cardd__arrow">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="15" width="15">
                      <path fill="#fff" d="M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.3232 13.2374C21.0066 12.554 21.0066 11.446 20.3232 10.7626L14.5303 4.96967C14.2374 4.67678 13.7626 4.67678 13.4697 4.96967C13.1768 5.26256 13.1768 5.73744 13.4697 6.03033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L13.4697 17.9697Z"></path>
                  </svg>
              </div>
          </div>
          </Link>

          
          <div class="cardd">
              <h3 class="cardd__title">GRINGOS APP
              </h3>
              <p class="cardd__content">Enjoy using our app as much as we enjoy 'NASVIRAVANJE'</p>
              <div class="cardd__arrow">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="15" width="15">
                      <path fill="#fff" d="M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.3232 13.2374C21.0066 12.554 21.0066 11.446 20.3232 10.7626L14.5303 4.96967C14.2374 4.67678 13.7626 4.67678 13.4697 4.96967C13.1768 5.26256 13.1768 5.73744 13.4697 6.03033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L13.4697 17.9697Z"></path>
                  </svg>
              </div>
          </div>
          

          <Link className="linkk" to="/edit-account">
          <div class="cardd">
              <h3 class="cardd__title">Your profile
              </h3>
              <p class="cardd__content">Look at all your informations and able to update it. </p>
              <div class="cardd__arrow">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="15" width="15">
                      <path fill="#fff" d="M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.3232 13.2374C21.0066 12.554 21.0066 11.446 20.3232 10.7626L14.5303 4.96967C14.2374 4.67678 13.7626 4.67678 13.4697 4.96967C13.1768 5.26256 13.1768 5.73744 13.4697 6.03033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L13.4697 17.9697Z"></path>
                  </svg>
              </div>
          </div>
          </Link>

          </div>  
          )}

        <footer className="footer">
          <p>© 2024 - All rights reserved</p>
        </footer>
      </div>
    </div>
  );
}

export default Home;