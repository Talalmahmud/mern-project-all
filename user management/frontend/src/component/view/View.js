import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    <div>
      <p>{user.name || "a"}</p>
      <p>{user.email}</p>
      <p>{user.phone}</p>
      <p>{user.address}</p>
    </div>
  );
};

export default View;
