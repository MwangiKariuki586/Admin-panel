import "./footer.scss";
import { FiPower } from "react-icons/fi";

const Footer = () => {
  return (
    <div className="footer">
      <div className="signout">
        <FiPower />
        <span>Sign out</span>
      </div>
      <span>Admin Dashboard</span>
    </div>
  );
};

export default Footer;
