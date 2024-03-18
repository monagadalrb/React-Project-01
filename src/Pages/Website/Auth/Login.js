import axios from "axios";
import { useContext, useState } from "react";
import Header from "../../../Components/Header";
import "./login.css";
import { User } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accept, setAccept] = useState(false);
  const [Error, setError] = useState(false);

  //Cookie
  const cookie = new Cookies();

  const user = useContext(User);
  const navigate = useNavigate();
  async function Submit(e) {
    e.preventDefault();
    setAccept(true);
    try {
      // send data
      let Res = await axios.post(`http://127.0.0.1:8000/api/login`, {
        email: email,
        password: password,
      });
      const userDetails = Res.data.data.user;
      const token = Res.data.data.token;

      cookie.set("Bearer", token);

      user.setAuth({ token, userDetails });
      navigate("/dashboard");
    } catch (err) {
      if (err.response.status === 401) {
        setError(err.response.status);
      }
      setAccept(true);
    }
  }
  return (
    <div>
      <Header />
      <div className="parent sign-up login">
        <form onSubmit={Submit} className="shadow">
          <div>
            <input
              id="email"
              type="email"
              placeholder="Enter E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {password.length < 8 && accept && (
              <p className="error">Wrong password, please try again</p>
            )}
            {accept && Error && (
              <p className="error">
                Wrong E-mail or Password, please try again
              </p>
            )}
          </div>
          <div>
            <button className="btn" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
