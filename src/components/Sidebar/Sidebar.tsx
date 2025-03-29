import React from "react";
import { menuItems } from "../../consts/menuItems";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Sidebar: React.FC = () => {
  return (
    <div style={{ width: "200px", background: "#f4f4f4", padding: "10px" }}>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {Object.entries(menuItems).map(([key, { page, url, icon }]) => (
          <li key={key} style={{ margin: "10px 0" }}>
            <Link
              to={url}
              style={{
                textDecoration: "none",
                color: "#333",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src={icon}
                alt={`${page} icon`}
                style={{ width: "20px", height: "20px", marginRight: "10px" }}
              />
              {page}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
