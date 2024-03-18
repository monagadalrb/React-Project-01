// This component for creating accounts to users by admin
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../Website/Context/UserContext";

export default function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rPassword, setRPassword] = useState("");
  const [accept, setAccept] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const navigate = useNavigate();

  const context = useContext(User);
  const token = context.auth.token;

  async function Submit(e) {
    e.preventDefault();
    setAccept(true);
    try {
      // send data
      await axios.post(
        `http://127.0.0.1:8000/api/user/create`,
        {
          name: name,
          email: email,
          password: password,
          password_confirmation: rPassword,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      navigate("/dashboard/users");
    } catch (err) {
      if (err.response.status === 422) {
        setEmailError(err.response.status);
      }
      setAccept(true);
    }
  }
  return (
    <div style={{ marginTop: "10px" }}>
      <div className="sign-up">
        <form onSubmit={Submit}>
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
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
