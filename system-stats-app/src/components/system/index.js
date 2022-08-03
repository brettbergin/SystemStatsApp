import React, { useEffect, useState }  from "react";
import axios from "axios";
import Cookies from 'universal-cookie';

export default function SystemInfo() {
    const [itemRows, setItemRows] = useState([]);
    const cookies = new Cookies();

    useEffect(() => {
        async function fetch_system_info() {    
          let access_token = cookies.get('access_token')
    
          let resp = await axios.get(
            'http://127.0.0.1:5000/api/system/users/list',
            {headers: {
              'Authorization': `Bearer ${access_token}`, 
              'Content-Type': 'application/json'}}
          )
          if (resp.status != 200) {
            console.log(`[-] Status code received from API: ${resp.status}.`)
          }
          if (resp.data && resp.data.length){
            setItemRows(resp.data);
          }
        }
    
        fetch_system_info();
      }, [])

    return (
        <>
        <div>
            <h2>System Users</h2>
        </div>
        <div>
            <p>Here is the number of results: {itemRows.length}</p>
            <table border="true">
                <thead>
                    <tr>
                        <th>Timestamp</th>
                        <th>Target</th>
                        <th>Started</th>
                        <th>Terminal</th>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody style={{ textAlign: "center" }}>
                    {itemRows.length && itemRows.map(({ id, timestamp, target, started, terminal, username }) => <tr key={id}>
                        <td>{timestamp}</td>
                        <td>{target}</td>
                        <td>{started}</td>
                        <td>{terminal}</td>
                        <td>{username}</td>
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
        </>
    );
}
