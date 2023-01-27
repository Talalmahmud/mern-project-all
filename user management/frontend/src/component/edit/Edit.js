import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Edit = () => {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  const getData = () => {
    axios
      .get(`http://localhost:5000/api/user/${id}`)
      .then((res) => setInputs(res.data.user))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getData();
  }, []);

  const handlonChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleonSubmit = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:5000/api/user/${id}`, inputs)
      .then((res) => {
        console.log("User is updated");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="register-contaner">
        <div className="register">
          <form onSubmit={handleonSubmit}>
            <div className="input-controller">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={inputs.name}
                onChange={handlonChange}
              />
            </div>
            <div className="input-controller">
              <label>Email</label>
              <input
                type="text"
                name="email"
                value={inputs.email}
                onChange={handlonChange}
              />
            </div>
            <div className="input-controller">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={inputs.phone}
                onChange={handlonChange}
              />
            </div>
            <div className="input-controller">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={inputs.address}
                onChange={handlonChange}
                placeholder="Village,Thana,District"
              />
            </div>
            <button className="register-btn" type="submit">
              Add
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Edit;
