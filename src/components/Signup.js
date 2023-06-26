import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

  let navigate = useNavigate();

  const [creds,setCreds] = useState({name:"",email:"",password:"",cpassword:""});

  const onChange = (e)=>{
    setCreds({...creds,[e.target.name] : e.target.value});
}

    const handleSubmit= async (e)=>{
        e.preventDefault();
        const fetchurl = "http://localhost:5000/api/auth/createuser"
        const response = await fetch(fetchurl, {
            method: "POST", 
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({name:creds.name,email:creds.email,password:creds.password}),
          });
          const responseJson = await response.json();
          console.log(responseJson);
          if(responseJson.success)
          {
              localStorage.setItem('token',responseJson.authToken);
              navigate('/');
              props.showAlert("Account created successfully","success");
          }
          else
          {
            props.showAlert("Invalid Credentials","danger");
          }
    }


  return (
    <>
    <form onSubmit={handleSubmit}>
    <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={onChange}/>
    <div id="emailhelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm password</label>
    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange}/>
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>

    </>
  )
}

export default Signup
