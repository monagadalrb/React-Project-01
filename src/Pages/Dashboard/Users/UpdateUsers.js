import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../Website/Context/UserContext";
import axios from "axios";

export default function UpdateUsers() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rPassword, setRPassword] = useState("");
  const [accept, setAccept] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const context = useContext(User);
  const token = context.auth.token;

  const navigate = useNavigate();
  const id = window.location.pathname.split("/").splice(-1)[0];

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/user/showbyid/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setName(data[0].name);
        setEmail(data[0].email);
      });
  }, []);

  async function Submit(e) {
    e.preventDefault();
    setAccept(true);
    try {
      // send data
      await axios.post(
        `http://127.0.0.1:8000/api/user/update/${id}`,
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
    <div className="parent">
      <h1>Update User</h1>
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
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
