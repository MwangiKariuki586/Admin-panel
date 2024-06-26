import { Link } from "react-router-dom";
import "./Menu.scss";
import { HiOutlineHome } from "react-icons/hi";
import { GoGitPullRequest } from "react-icons/go";
import { RiStockLine } from "react-icons/ri";
import { HiOutlinePrinter } from "react-icons/hi2";
import { VscOrganization } from "react-icons/vsc";
import { CiLocationArrow1 } from "react-icons/ci";
import { TbSettings } from "react-icons/tb";
import { PiChartScatter } from "react-icons/pi";
import { FaUsersRays } from "react-icons/fa6";

const Menu = () => {
  return (
    <div className="menu">
      <div className="item">
        <div>
          <span className="title">MAIN</span>
          <Link to={"/"} className="listItem">
            <HiOutlineHome />
            <span className="listItemTitle">Homepage</span>
          </Link>
        </div>
        <div>
          <span className="title">MODELS</span>
          <Link to={"/users"} className="listItem">
            <FaUsersRays />
            <span className="listItemTitle">Users</span>
          </Link>
          <Link to={"/toner_requests"} className="listItem">
            <GoGitPullRequest />
            <span className="listItemTitle">Toner Requests</span>
          </Link>
          <Link to={"/toners"} className="listItem">
            <RiStockLine />
            <span className="listItemTitle">Toners</span>
          </Link>
          <Link to={"/printers"} className="listItem">
            <HiOutlinePrinter />
            <span className="listItemTitle">Printers</span>
          </Link>
          <Link to={"/departments"} className="listItem">
            <VscOrganization />
            <span className="listItemTitle">Departments</span>
          </Link>
          <Link to={"/locations"} className="listItem">
            <CiLocationArrow1 />
            <span className="listItemTitle">Locations</span>
          </Link>
        </div>
        <div>
          <span className="title">MAINTENANCE</span>
          <Link to={"/"} className="listItem">
            <TbSettings />
            <span className="listItemTitle">Settings</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Menu;
