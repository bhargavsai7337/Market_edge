import React, { useState, useEffect } from "react";
import "../main.css";

const UserManagement = () => {
     const [showForm, setShowForm] = useState(false);
      const [isEditing, setIsEditing] = useState(false);
      const [showMenu, setShowMenu] = useState(null);
      const [viewUser, setViewUser] = useState(null);
      const [users, setUsers] = useState([]);
      const [idCounter, setIdCounter] = useState(1);
      const [searchTerm, setSearchTerm] = useState("");
    
    const filteredUsers = users.filter(
      (user) =>
        user.organization_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.contact_person.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
      const [formData, setFormData] = useState({
        organization_name: "",
        organization_address1: "",
        organization_address2: "",
        country: "",
        state: "",
        zipcode: "",
        fiid: "",
        contact_number: "",
        contact_person: "",
        renewal_date: "",
        email: "",
        status: "Inactive",
      });
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const generateId = (num) => `TC${num.toString().padStart(3, "0")}`;
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        if (!formData.organization_name || !formData.contact_person) {
          alert("Organization Name and Contact Person are required!");
          return;
        }
    
        if (isEditing) {
          setUsers(
            users.map((user) =>
              user.id === formData.id ? { ...formData } : user
            )
          );
        } else {
          const newUser = { ...formData, id: generateId(idCounter) };
          setUsers([...users, newUser]);
          setIdCounter(idCounter + 1);
        }
    
        setFormData({
          organization_name: "",
          organization_address1: "",
          organization_address2: "",
          country: "",
          state: "",
          zipcode: "",
          fiid: "",
          contact_number: "",
          contact_person: "",
          renewal_date: "",
          email: "",
          status: "Inactive",
        });
        setShowForm(false);
        setIsEditing(false);
      };
    
      const toggleStatus = (id) => {
        setUsers(
          users.map((user) =>
            user.id === id
              ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" }
              : user
          )
        );
      };
    
      const handleEdit = (user) => {
        setFormData(user);
        setIsEditing(true);
        setShowForm(true);
        setShowMenu(null);
      };
    
      const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this record?")) {
          setUsers(users.filter((u) => u.id !== id));
        }
      };
    
      const handleView = (user) => {
        setViewUser(user);
        setShowMenu(null);
      };
    
      const toggleMenu = (id) => {
        setShowMenu(showMenu === id ? null : id);
      };
    
      // Close dropdown when clicking outside
      useEffect(() => {
        const handleClickOutside = (e) => {
          if (!e.target.closest(".menu-wrapper")) {
            setShowMenu(null);
          }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
      }, []);
    
return (
    <div className="main-container">
      <h2>User Engagement</h2>
      <div className="hbutt">
        <h4>
          Complete oversight of users with renewal tracking, organization details, and account status monitoring
        </h4>
        <div className="spacer"></div>
        <button className="open-btn" onClick={() => setShowForm(true)}>
          + Add User
        </button>
      </div>

      {/* Add/Edit Popup */}
      {showForm && (
        <div className="popup-form">
          <form className="form-box" onSubmit={handleSubmit}>
            <h3>{isEditing ? "Edit Organization" : "Add Organization"}</h3>

            <input
              type="text"
              name="organization_name"
              placeholder="Organization Name *"
              value={formData.organization_name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="organization_address1"
              placeholder="Address Line 1 *"
              value={formData.organization_address1}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="organization_address2"
              placeholder="Address Line 2"
              value={formData.organization_address2}
              onChange={handleChange}
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
            />
            <input
              type="text"
              name="zipcode"
              placeholder="Zipcode"
              value={formData.zipcode}
              onChange={handleChange}
            />
            <input
              type="text"
              name="fiid"
              placeholder="FIID"
              value={formData.fiid}
              onChange={handleChange}
            />
            <input
              type="text"
              name="contact_person"
              placeholder="Contact Person *"
              value={formData.contact_person}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="contact_number"
              placeholder="Contact Number"
              value={formData.contact_number}
              onChange={handleChange}
            />
            <input
              type="date"
              name="renewal_date"
              placeholder="Renewal Date"
              value={formData.renewal_date}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />

            <div className="btn-group">
              <button type="submit">{isEditing ? "Update" : "Save"}</button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setShowForm(false);
                  setIsEditing(false);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* View Popup */}
      {viewUser && (
        <div className="popup-form">
          <div className="form-box">
            <h3>Organization Details</h3>
            <p>
              <strong>ID:</strong> {viewUser.id}
            </p>
            <p>
              <strong>Organization Name:</strong> {viewUser.organization_name}
            </p>
            <p>
              <strong>Organization address1:</strong>{" "}
              {viewUser.organization_address1}
            </p>
            <p>
              <strong>Organization address2:</strong>{" "}
              {viewUser.organization_address2}
            </p>
            <p>
              <strong>Country:</strong> {viewUser.country}
            </p>
            <p>
              <strong>State:</strong> {viewUser.state}
            </p>
            <p>
              <strong>Zipcode:</strong> {viewUser.zipcode}
            </p>
            <p>
              <strong>Contact Person:</strong> {viewUser.contact_person}
            </p>
            <p>
              <strong>Email:</strong> {viewUser.email}
            </p>
            <p>
              <strong>Contact Number:</strong> {viewUser.contact_number}
            </p>
            <p>
              <strong>FEIN#(Tax id):</strong> {viewUser.fiid}
            </p>
            <p>
              <strong>Status:</strong> {viewUser.status}
            </p>
            <button className="close-view" onClick={() => setViewUser(null)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Table Display */}
      <div className="data-section">
          <div className="table-header">
    <h3>User Directory</h3>
    <input
      type="text"
      placeholder="Search by Organization or Contact Person..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="search-input"
    />
  </div>
        {users.length === 0 ? (
          <p>No data available</p>
        ) : (
          <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Organization</th>
                <th>Contact Person</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.organization_name}</td>
                  <td>{user.contact_person}</td>
                  <td
                    className={`status ${
                      user.status === "Active" ? "active" : "inactive"
                    }`}
                  >
                    {user.status}
                  </td>
                  <td className="action-cell">
                    <button
                      className={`status-btn ${
                        user.status === "Active" ? "deactivate" : "activate"
                      }`}
                      onClick={() => toggleStatus(user.id)}
                    >
                      {user.status === "Active" ? "Deactivate" : "Activate"}
                    </button>

                    <div className="menu-wrapper">
                      <button
                        className="menu-btn"
                        onClick={() => toggleMenu(user.id)}
                      >
                        ⋮
                      </button>
                      {showMenu === user.id && (
                        <div className="dropdown-menu">
                          <button onClick={() => handleView(user)}>View</button>
                          <button onClick={() => handleEdit(user)}>Edit</button>
                          <button onClick={() => handleDelete(user.id)}>
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserManagement