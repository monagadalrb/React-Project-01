import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../../Website/Context/UserContext";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [runEffect, setRun] = useState(0);

  //Get Token
  const context = useContext(User);
  const token = context.auth.token;
  useEffect(() => {
    // Send Token
    axios
      .get("http://127.0.0.1:8000/api/user/show", {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((data) => setUsers(data.data))
      .catch((err) => console.log(err));
  }, [runEffect]);

  async function deleteUser(id) {
    try {
      const Res = await axios.delete(
        `http://127.0.0.1:8000/api/user/delete/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (Res.status === 200) {
        setRun((prev) => prev + 1);
      }
    } catch {
      console.log("none");
    }
  }
  const ShowUsers = users.map((user, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td className="edit-icons">
        <Link to={`${user.id}`}>
          <i className="fa-solid fa-pen-to-square"></i>
        </Link>
        <i
          className="fa-solid fa-trash"
          onClick={() => deleteUser(user.id)}
        ></i>
      </td>
    </tr>
  ));

  return (
    <div className="users">
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>E-Mail</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{ShowUsers}</tbody>
      </table>
    </div>
  );
}
