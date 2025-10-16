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
       const [filterStatus, setFilterStatus] = useState("");
       const [extraFilter, setExtraFilter] = useState("");
       const totalUsers = users.length;
       const totalClients = users.length; 
       const activeUsers = users.filter((u) => u.status === "Active").length;
       const inactiveUsers = users.filter((u) => u.status === "Inactive").length;
     
     const filteredUsers = users.filter((user) => {
       const matchesSearch =
         user.organization_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         user.first_name.toLowerCase().includes(searchTerm.toLowerCase());
     
       const matchesStatus =
         filterStatus === "" ||
         filterStatus === "All" ||
         user.status === filterStatus;
     
       return matchesSearch && matchesStatus;
     });
     
       const [formData, setFormData] = useState({
         first_name:"",
         last_name:"",
         contact_number: "",
         email: "",
         organization_name: "",
         additinal_notes:"",
         status: "Inactive",
       });
     
       const handleChange = (e) => {
         setFormData({ ...formData, [e.target.name]: e.target.value });
       };
     
       const generateId = (num) => `TC${num.toString().padStart(3, "0")}`;
     
       const handleSubmit = (e) => {
         e.preventDefault();
     
         if (!formData.organization_name || !formData.first_name) {
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
           first_name:"",
           last_name:"",
           contact_number: "",
           email: "",
           organization_name: "",
           additinal_notes:"",
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
      <h2>User Management</h2>
      <div className="hbutt">
        <h5>
         Complete oversight of users with renewal tracking, organization details, and account status monitoring
        </h5>
        <div className="spacer"></div>

        <button className="open-btn" onClick={() => setShowForm(true)}>
          + Add User
        </button>
      </div>
      <div className="summary-blocks">
  <div className="summary-card">
    <h4>Total Users</h4>
    <p>{totalUsers}</p>
  </div>
  <div className="summary-card">
    <h4>Total Clients</h4>
    <p>{totalClients}</p>
  </div>
  <div className="summary-card">
    <h4>Active Users</h4>
    <p>{activeUsers}</p>
  </div>
  <div className="summary-card">
    <h4>Inactive Users</h4>
    <p>{inactiveUsers}</p>
  </div>
</div>

      {/* Add/Edit Popup */}
      {showForm && (
        <div className="popup-form">
          <form className="form-box" onSubmit={handleSubmit}>
            <h3>{isEditing ? "Edit Organization" : "Add Organization"}</h3>

            <input
              type="text"
              name="first_name"
              placeholder="First Name *"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name *"
              value={formData.last_name}
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
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="text"
              name="organization_name"
              placeholder="organization name"
              value={formData.organization_name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="aadditinal_notes"
              placeholder="Additinal notes"
              value={formData.additinal_notes}
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
              <strong>First Name:</strong> {viewUser.first_name}
            </p>
            <p>
              <strong>Last name:</strong>{" "}
              {viewUser.last_name}
            </p>
            <p>
              <strong>Organization address2:</strong>{" "}
              {viewUser.organization_address2}
            </p>
            <p>
              <strong>Email:</strong> {viewUser.email}
            </p>
            <p>
              <strong>Contact Number:</strong> {viewUser.contact_number}
            </p>
            <p>
              <strong>Additional Notes:</strong> {viewUser.additinal_notes}
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
    <h3>Users Directory</h3>
    <div className="table-controls">
    <input
      type="text"
      placeholder="Search by Organization or Contact Person..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="search-input"
    />
    <select
      className="status-filter"
      value={filterStatus}
      placeholder="Status"
      onChange={(e) => setFilterStatus(e.target.value)}
    >
      <option value="" disabled hidden>
        Status
      </option>
      <option value="All">Show all</option>
      <option value="Active">Active</option>
      <option value="Inactive">Inactive</option>
    </select>

    <select
    className="extra-filter"
    value={extraFilter}
    placeholder="Export"
    onChange={(e) => setExtraFilter(e.target.value)}
  >
    <option value="" disabled hidden>
        Export
    </option>
    <option value="Option1">Download by PDF</option>
    <option value="Option2">Download by CSV</option>
  </select>
    </div>
  </div>
        {users.length === 0 ? (
          <p>No data available</p>
        ) : (
          <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>first name</th>
                <th>contact number</th>
                <th>email address</th>
                <th>Organization name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.first_name}</td>
                  <td>{user.contact_number}</td>
                  <td>{user.email}</td>
                  <td>{user.organization_name}</td>
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