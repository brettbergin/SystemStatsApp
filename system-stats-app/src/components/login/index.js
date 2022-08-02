import React, {useState}  from "react";
import axios from "axios";
import Cookies from 'universal-cookie';

import Home from "../home";


export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const [isLoggedIn, setIsLoggedIn] = useState(false)
  
    const cookies = new Cookies();
  
    const onSubmitClick = async () => {
      
      let opts = {
        'email': username,
        'password': password
      }
  
      const resp = await axios.post('http://127.0.0.1:5000/authenticate', opts)
  
      const access_token = resp.data.access_token
      const refresh_token = resp.data.refresh_token
      
      cookies.set('access_token', access_token, {path: '/', maxAge: 60 * 60 * 24 * 365, sameSite: false});
      cookies.set('refresh_token', refresh_token, {path: '/', maxAge: 60 * 60 * 24 * 365, sameSite: false});
      setIsLoggedIn(true);
    }
  
    const handleUsernameChange = (e) => {
      setUsername(e.target.value)
    }
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value)
    }
  
    return ( !isLoggedIn? 
        <div>
        <h2>Login</h2>
        <form action="#">
            <div>
            <input type="text" 
                placeholder="Username" 
                onChange={handleUsernameChange}
                value={username} 
            />
            </div>
            <div>
            <input
                type="password"
                placeholder="Password"
                onChange={handlePasswordChange}
                value={password}
            />
            </div>
            <button onClick={onSubmitClick} type="button">
            Login
            </button>
        </form>
        </div>
        : 
        <Home />
    )
  }
