import { Link } from "react-router-dom";

export default function TopBar() {
  return (
    <div className="top-bar shadow">
      <div className="container d-flex  ">
        <h1 style={{ fontFamily: "Permanent Marker" }}>Store</h1>
        <Link to="/" className="btn">
          Go to website
        </Link>
      </div>
    </div>
  );
}
