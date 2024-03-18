import axios from "axios";
import { useContext, useState } from "react";
import Header from "../../../Components/Header";
import "./login.css";
import { User } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rPassword, setRPassword] = useState("");
  const [accept, setAccept] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const user = useContext(User);

  const navigate = useNavigate();
  //Cookie
  const cookie = new Cookies();

  async function Submit(e) {
    e.preventDefault();
    setAccept(true);
    try {
      // send data
      let Res = await axios.post(`http://127.0.0.1:8000/api/register`, {
        name: name,
        email: email,
        password: password,
        password_confirmation: rPassword,
      });
      const userDetails = Res.data.data.user;
      const token = Res.data.data.token;
      cookie.set("Bearer", token);
      user.setAuth({ token, userDetails });
      navigate("/dashboard");
    } catch (err) {
      if (err.response.status === 422) {
        setEmailError(err.response.status);
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
              id="name"
              type="text"
              placeholder="Enter Name "
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {name.length < 2 && accept && (
              <p className="error">Name must be more than 2 chars</p>
            )}
          </div>
          <div>
            <input
              id="email"
              type="email"
              placeholder="Enter E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {accept && emailError === 422 && (
              <p className="error">E-mail has already been taken</p>
            )}
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
              <p className="error">Password must be more than 8 chars</p>
            )}
          </div>
          <div>
            <input
              id="re-password"
              type="password"
              placeholder="Repeat password"
              value={rPassword}
              onChange={(e) => setRPassword(e.target.value)}
            />

            {rPassword !== password && accept && (
              <p className="error">Password does not match</p>
            )}
          </div>
          <div>
            <button className="btn" type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
