import React, { useEffect, useState }  from "react";
import axios from "axios";
import Cookies from 'universal-cookie';

export default function CpuInfo() {
    const [itemRows, setItemRows] = useState([]);
    const cookies = new Cookies();

    useEffect(() => {
        async function fetch_cpu_info() {    
          let access_token = cookies.get('access_token')
    
          let resp = await axios.get(
            'http://127.0.0.1:5000/api/cpu/list',
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
    
        fetch_cpu_info();
      }, [])

    return (
        <>
        <div>
            <h2>CPU Info</h2>
        </div>
        <div>
            <p>Here is the number of results: {itemRows.length}</p>
            <table border="true">
                <thead>
                    <tr>
                        <th>Timestamp</th>
                        <th>Target</th>
                        <th>Percents</th>
                    </tr>
                </thead>
                <tbody style={{ textAlign: "center" }}>
                    {itemRows.length && itemRows.map(({ id, timestamp, target, percents }) => <tr key={id}>
                    <td>{timestamp}</td>
                    <td>{target}</td>
                    <td>{percents}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
        </>
    );
}
