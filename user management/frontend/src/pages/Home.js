import { NavLink, useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";

import "./home.css";
import { useEffect, useState } from "react";
import axios from "axios";
const Home = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/user/alluser")
      .then((res) => setUsers(res.data.users))
      .catch((err) => console.log(err));
  }, [users]);

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:5000/api/user/${id}`)
      .then((res) => console.log("User is deleted"))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="container">
        <div className="home-container">
          <NavLink to="/register">
            <h3>Add User</h3>
          </NavLink>
          <div className="show-user">
            <table>
              <tbody>
                <tr>
                  <th>SL No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
                {users &&
                  users.map((user, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>
                          <FaEye
                            className="view-icon"
                            onClick={() => navigate(`/view/${user._id}`)}
                          ></FaEye>
                          <FaEdit
                            className="edit-icon"
                            onClick={() => navigate(`/edit/${user._id}`)}
                          ></FaEdit>
                          <FaTrashAlt
                            className="delete-icon"
                            onClick={() => deleteUser(user._id)}
                          ></FaTrashAlt>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
