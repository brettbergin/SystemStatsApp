import React, { useEffect, useState }  from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import axios from "axios";
import Cookies from 'universal-cookie';

export default function App() {
  return (
    <Router>
      <div>
        <nav>

          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/network_info">NetworkInfo</Link>
            </li>
          </ul>  
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/network_info" element={<NetworkInfo/>}/>
      </Routes>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitClick = async () => {
    
    let opts = {
      'email': username,
      'password': password
    }

    const resp = await axios.post('http://127.0.0.1:5000/authenticate', opts)

    const access_token = resp.data.access_token
    const refresh_token = resp.data.refresh_token

    const cookies = new Cookies();
    cookies.set('access_token', access_token, { path: '/' });
    console.log(cookies.get('access_token'));

    // localStorage.setItem('access_token', access_token)
    // localStorage.setItem('refresh_token', refresh_token)
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  return (
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
  )
}

function NetworkInfo() {
  const [parsed_resp, SetParseResp] = useState(null)
  const [json_data, SetJsonData] = useState(null)

  useEffect(()=>{
    async function fetch_network_info() {
      //let access_token = localStorage.getItem('access_token');

      const cookies = new Cookies();
      let access_token = cookies.get('access_token')

      let resp = await axios.get(
        'http://127.0.0.1:5000/api/network/list',
        {headers: {'Authorization': `Bearer ${access_token}`}}
      )
      
      let resp_as_str = JSON.stringify(resp.data)
      console.log(resp_as_str)
      SetJsonData(resp_as_str)

      let parsed_resp = JSON.parse(resp_as_str)
      SetParseResp(parsed_resp.report_id)
    }

    fetch_network_info()
  }, [])

  // return <h2>Network Info</h2>;
  
  return <h2>NetworkInfo: {parsed_resp ? JSON.stringify(parsed_resp, null, "/t") : "waiting." }{json_data ? JSON.stringify(json_data, null, "/t") : "waiting." }</h2>;
  // JSON.stringify(target, null, "/t") : "waiting for data" } </h2>;
}
