import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
export default function Header() {
  const cookie = new Cookies();
  const token = cookie.get("Bearer");

  async function handleLogOut() {
    await axios.post("http://127.0.0.1:8000/api/logout", null, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    cookie.remove("Bearer");
    window.location.pathname = "/";
  }
  return (
    <nav className="shadow">
      <div className="container">
        <div className="left-side">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </div>
        <div>
          {!token ? (
            <div>
              <Link to="/register" className="btn">
                Register
              </Link>
              <Link to="/login" className="btn">
                Login
              </Link>
            </div>
          ) : (
            <div>
              <Link to="/dashboard" className="btn">
                Dashboard
              </Link>
              <Link className="btn" onClick={handleLogOut}>
                Log Out
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
