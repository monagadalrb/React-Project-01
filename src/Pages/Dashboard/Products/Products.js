import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../../Website/Context/UserContext";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [runEffect, setRun] = useState(0);

  //Get Token
  const context = useContext(User);
  const token = context.auth.token;

  useEffect(() => {
    // Send Token
    axios
      .get("http://127.0.0.1:8000/api/product/show", {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((data) => setProducts(data.data))
      .catch((err) => console.log(err));
  }, [runEffect]);

  async function deleteUser(id) {
    try {
      const Res = await axios.delete(
        `http://127.0.0.1:8000/api/product/delete/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (Res.status === 200) {
        setRun((prev) => prev + 1);
      }
    } catch (err) {
      console.log(err);
    }
  }
  const ShowProducts = products.map((product, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{product.title}</td>
      <td>{product.description}</td>
      <td>{product.image}</td>
      <td className="edit-icons">
        <Link to={`${product.id}`}>
          <i className="fa-solid fa-pen-to-square"></i>
        </Link>
        <i
          className="fa-solid fa-trash"
          onClick={() => deleteUser(product.id)}
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
            <th>Title</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{ShowProducts}</tbody>
      </table>
    </div>
  );
}
