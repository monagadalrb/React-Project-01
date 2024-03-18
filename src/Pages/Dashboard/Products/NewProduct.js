import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../Website/Context/UserContext";

export default function NewProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [accept, setAccept] = useState(false);

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("image", image);

  const navigate = useNavigate();

  const context = useContext(User);
  const token = context.auth.token;

  async function Submit(e) {
    e.preventDefault();
    setAccept(true);
    try {
      // send data
      await axios.post(`http://127.0.0.1:8000/api/product/create`, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      navigate("/dashboard/products");
    } catch (err) {
      if (err.response.status === 422) {
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
              required
              id="title"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {accept && title.length < 2 && (
              <p className="error">Product Title must be more than 1 char</p>
            )}
          </div>
          <div>
            <input
              required
              id="description"
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <input
              required
              id="image"
              type="file"
              placeholder="Image"
              onChange={(e) => setImage(e.target.files.item(0))}
            />
          </div>
          <div>
            <button className="btn" type="submit">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
