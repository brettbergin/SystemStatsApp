import React, { useEffect, useState }  from "react";

import axios from "axios";
import Cookies from 'universal-cookie';

export default function MemoryInfo() {
    const [itemRows, setItemRows] = useState([]);
    const cookies = new Cookies();
  
    useEffect(() => {
      async function fetch_memory_info() {    
        let access_token = cookies.get('access_token')
  
        let resp = await axios.get(
          'http://127.0.0.1:5000/api/memory/list',
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
  
      fetch_memory_info();
    }, [])

    return (
        <>
        <div>
            <h2>Memory Info</h2>
        </div>
        <div>
            <p>Here is the number of results: {itemRows.length}</p>
            <table border="true">
                <thead>
                    <tr>
                        <th>Timestamp</th>
                        <th>Target</th>
                        <th>Active</th>
                        <th>Inactive</th>
                        <th>Available</th>
                        <th>Free</th>
                        <th>Percent</th>
                        <th>Total</th>
                        <th>Used</th>
                        <th>Wired</th>
                    </tr>
                </thead>
          <tbody style={{ textAlign: "center" }}>
            {itemRows.length && itemRows.map(({ id, timestamp, target, active, available, free, inactive, percent, total, used, wired }) => <tr key={id}>
              <td>{timestamp}</td>
              <td>{target}</td>
              <td>{active}</td>
              <td>{available}</td>
              <td>{free}</td>
              <td>{inactive}</td>
              <td>{percent}</td>
              <td>{total}</td>
              <td>{used}</td>
              <td>{wired}</td>
            </tr>
            )}
          </tbody>
        </table>
      </div></>
    );
}
