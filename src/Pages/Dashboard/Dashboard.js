import { Outlet } from "react-router-dom";
import SideBar from "../../Components/SideBar";
import TopBar from "../../Components/TopBar";
// import { useContext } from "react";
// import { TestContext } from "../Website/Context/TestContext";

export default function Dashboard() {
  // const PrintContext = useContext(TestContext);
  // console.log(PrintContext);
  return (
    <div>
      <TopBar />
      <div className="content-flex">
        <SideBar />
        <div style={{ padding: "20px", width: "80%" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
