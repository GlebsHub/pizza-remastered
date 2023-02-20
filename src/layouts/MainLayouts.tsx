
import {Header} from "../components";
import { Outlet} from "react-router-dom";

const MainLayouts: React.FC = () => {
  return (
    <div className="wrapper">
            <Header />
        <div className="content">
            <Outlet />
        </div>
    </div>
  )
}

export default MainLayouts;