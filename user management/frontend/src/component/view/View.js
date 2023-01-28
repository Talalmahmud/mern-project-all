import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./view.css";

const View = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();

  const getData = () => {
    axios
      .get(`http://localhost:5000/api/user/${id}`)
      .then((res) => setUser(res.data.user))
      .catch((err) => console.log(err));
  };
  //   console.log(id);
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="view-user">
        <p>Name: {user.name || "a"}</p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Address: {user.address}</p>
      </div>
    </>
  );
};

export default View;
