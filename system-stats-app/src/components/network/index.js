import React, { useEffect, useState }  from "react";

import axios from "axios";
import Cookies from 'universal-cookie';

export default function NetworkInfo() {
    const [itemRows, setItemRows] = useState([]);
    const cookies = new Cookies();
  
    useEffect(() => {
      async function fetch_network_info() {    
        let access_token = cookies.get('access_token')
  
        let resp = await axios.get(
          'http://127.0.0.1:5000/api/network/list',
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
  
      fetch_network_info();
    }, [])
  
    return (
      <><div>
        <h2>NetworkInfo</h2>
      </div>
      <div>
        <p>Here is the number of results: {itemRows.length}</p>
        <table border="true">
          <thead>
            <tr>
              <th>Target</th>
              <th>bytes_sent</th>
              <th>bytes_recvd</th>
              <th>packets_sent</th>
              <th>packets_recvd</th>
              <th>err_pkt_in</th>
              <th>err_pkt_out</th>
              <th>dropped_pkt_in</th>
              <th>dropped_pkt_out</th>
            </tr>
          </thead>
          <tbody style={{ textAlign: "center" }}>
            {itemRows.length && itemRows.map(({ id, target, bytes_sent, bytes_recvd, packets_sent, packets_recvd, err_pkt_in, err_pkt_out, dropped_pkt_in, dropped_pkt_out }) => <tr key={id}>
              <td>{target}</td>
              <td>{bytes_sent}</td>
              <td>{bytes_recvd}</td>
              <td>{packets_sent}</td>
              <td>{packets_recvd}</td>
              <td>{err_pkt_in}</td>
              <td>{err_pkt_out}</td>
              <td>{dropped_pkt_in}</td>
              <td>{dropped_pkt_out}</td>
            </tr>
            )}
          </tbody>
        </table>
      </div></>
    );
  }
  