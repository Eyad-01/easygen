import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/signin");
  };

  return (
    <>
      {token ? (
        <nav>
          <div>
            <Link to="/">Home</Link>
          </div>
          <div>
            <span
              style={{
                color: "white",
                fontWeight: "bold",
                marginRight: "20px",
              }}
            >
              hi, {userName}
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </nav>
      ) : null}
    </>
  );
};

export default Navbar;
