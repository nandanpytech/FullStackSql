import axios from "axios";
import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';

function SignUp() {
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [open,setOpen]=useState(false)

  const handleClose=()=>{
    setOpen(false)
}
  const navigate = useNavigate();
  const handleChange = (e, name) => {
    setInputData({ ...inputData, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(inputData.name!=="" || inputData.email!=="" || inputData.password!==""){
        axios
      .post("http://localhost:5000/api/register", inputData)
      .then((res) => {
        if (res?.data.Status === "Success") {
          navigate("/login");
        }else{
            setOpen(true)
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  };

  return (
    <>
      <div className="signupFrm">
        <div className="wrapper" style={{display:"flex",justifyContent:"center"}}>
          <form action="" onSubmit={handleSubmit} className="form">
            <h1 className="title">Sign up</h1>

            <div className="inputContainer">
              <input
                type="text"
                className="input"
                value={inputData.name}
                onChange={(e) => handleChange(e, "name")}
                placeholder="Enter a Name"
                required
              />
              <label for="" className="label">
                Name
              </label>
            </div>
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
            <Link to="/login">LogIn</Link>
          </form>
        </div>
      </div>

      <Snackbar
        anchorOrigin={{ vertical:"top", horizontal:"right" }}
        open={open}
        onClose={handleClose}
        autoHideDuration={2000}
        message="Email Already Exist!"
      />
    </>
  );
}

export default SignUp;
