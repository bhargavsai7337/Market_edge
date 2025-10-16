import React from 'react'
import { useState } from 'react';
import { login } from '../api/auth';
import myimg from '../assets/img.jpg'
import logo from '../assets/logo.png'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [accepted, setAccepted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const res = await api.post("/token/", { username, password });
        setTokens(res.data.access, res.data.refresh);
        alert("Logged in!");
      } catch (err) {
        alert("Login failed");
      }
    };

    const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
  };
  return (
    <div className='login'>
      <div className="me login-container">
      <form className="login-form shadow p-3 mb-5 bg-body-tertiary rounded" onSubmit={handleLogin}>
        <div className='logo-block'>
          <div className='img-div'>
            <img src={logo} alt="logo" className='logo' />
          </div>
          <div className='spacer'>

          </div>

        </div>
        
        <h2 className="login-title">Enter your email and password to access your account.</h2>

        <div className="form-group position-relative mb-3">
          <label>Email</label>
          <i className="bi bi-envelope-fill input-icon"></i>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group position-relative mb-3">
          <label>Password</label>
          <i className="bi bi-lock-fill input-icon"></i>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
          <i
          className={`bi ${showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"} toggle-icon`}
          onClick={() => setShowPassword(!showPassword)}
        ></i>
        </div>

        <div className="form-check">
          <div className='remeber_me'>
            <input
            type="checkbox"
            id="privacy"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
          />
          <label htmlFor="Remeberme">
            Remeber me
          </label>
          </div>
          <div className='spacer'>

          </div>
          <div className='forgot_passw'>
            <a href="">forgot password?</a>
          </div>
        </div>
        
        
        <button type="submit" onClick={handleLogout} className="login-button">
          Login
        </button>
      </form>
    </div>
    <div className='adv shadow p-3 mb-5 bg-body-tertiary rounded'>
      <div className='cont'>
        <h3>Effortlessly manage your team and operations.</h3>
        <h4>Login to access your dashbord and manage your team.</h4>
      </div>
      <div>
        <img src={myimg} alt="img" className='img' />
      </div>
      
      <h6>Copyright @c 2025 Marketedge LTD.</h6>
    </div>
    </div>
  );
};

export default Login