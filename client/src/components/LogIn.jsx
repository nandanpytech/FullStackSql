import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Snackbar from "@mui/material/Snackbar";
import { setEmail, setToken } from "../const/setToken";

function LogIn() {
  const [inputData, setInputData] = useState({ email: "", password: "" });
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e, name) => {
    setInputData({ ...inputData, [name]: e.target.value });
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", inputData)
      .then((res) => {
        if (res?.data?.Status === "Success") {
          navigate("/");
          setToken(res?.data?.Token);
          setEmail(res?.data?.Email);
        } else {
          setOpen(true);
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="signupFrm">
        <div className="wrapper" style={{display:"flex",justifyContent:"center"}}>
          <form action="" onSubmit={handleSubmit} className="form">
            <h1 className="title">LogIn</h1>

            <div className="inputContainer">
              <input
                type="email"
                className="input"
                value={inputData.email}
                onChange={(e) => handleChange(e, "email")}
                placeholder="Enter a Email"
                required
              />
              <label for="" className="label">
                Email
              </label>
            </div>
            <div className="inputContainer">
              <input
                type="text"
                className="input"
                value={inputData.password}
                onChange={(e) => handleChange(e, "password")}
                placeholder="Enter a password"
                required
              />
              <label for="" className="label">
                Password
              </label>
            </div>

            <button type="submit" className="submitBtn" value="Sign up">
              Submit
            </button>
            <Link to="/signup">Sign Up</Link>
          </form>
        </div>
      </div>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        onClose={handleClose}
        autoHideDuration={2000}
        message="Wrong Email or Password"
      />
    </>
  );
}

export default LogIn;
