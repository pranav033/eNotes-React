import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

  let token = null;

  const navigate = useNavigate();

  const [creds,setCreds] = useState({email:"",password:""});

  const onChange = (e)=>{
    setCreds({...creds,[e.target.name] : e.target.value});
}

    const handleSubmit= async (e)=>{
        e.preventDefault();
        const fetchurl = "http://localhost:5000/api/auth/login"
        const response = await fetch(fetchurl, {
            method: "POST", 
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({email:creds.email,password:creds.password}),
          });
          const responseJson = await response.json();
          console.log(responseJson);
          if(responseJson.success)
          {
              localStorage.setItem('token',responseJson.authToken);
              props.showAlert("Successfully logged in","success");
              navigate('/');
              
          }
          else
          {
            props.showAlert("Invalid Credentials","danger");
          }
    }

  return (
    <>
    <div className="container">
    <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={creds.email} onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" name="password" className="form-control" id="password" value={creds.password} onChange={onChange}/>
  </div>
  <button type="submit" className="btn btn-primary" >Login</button>
</form>
</div>
    </>
  )
}

export default Login
