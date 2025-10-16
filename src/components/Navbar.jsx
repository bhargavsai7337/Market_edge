import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUser, FaBars, FaChevronDown } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { LuLayoutDashboard, LuUsers } from "react-icons/lu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div>
      <nav className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
        <div className="top-section">
          <button
            className="toggle-btn"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Collapse sidebar" : "Open sidebar"}
          >
            <FaBars />
          </button>
        </div>

        <ul className="nav-links">
          {/* Dashboard */}
          <li className="link">
            <span className="icon">
              <LuLayoutDashboard />
            </span>
            {isOpen && (
              <Link to="/dashboard" className="text">
                Dashboard
              </Link>
            )}
          </li>

          {/* Client Engagement */}
          <li className="link">
            <span className="icon">
              <FaUser />
            </span>
            {isOpen && (
              <Link to="/client-engagement" className="text">
                Client Engagement
              </Link>
            )}
          </li>

          {/* User Management */}
          <li className="link">
            <span className="icon">
              <LuUsers />
            </span>
            {isOpen && (
              <Link to="/user-management" className="text">
                User Management
              </Link>
            )}
          </li>

          {/* Employee Management */}
          <li className="link">
            <span className="icon">
              <FaHome />
            </span>
            {isOpen && (
              <Link to="/employee-management" className="text">
                Employee Management
              </Link>
            )}
          </li>

          {/* Settings Submenu */}
          <li className="link submenu">
            <div
              className="submenu-header"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <span className="icon">
                <IoSettingsOutline />
              </span>
              {isOpen && <span className="text">Settings</span>}
              {isOpen && (
                <FaChevronDown
                  className={`arrow ${isProfileOpen ? "open" : ""}`}
                />
              )}
            </div>

            {isProfileOpen && isOpen && (
              <ul className="submenu-items">
                <li className="submenu-item">
                  <Link to="/settings/renewal-remainder">Renewal Remainder</Link>
                </li>
                <li className="submenu-item">
                  <Link to="/settings/rbac">RBAC</Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
