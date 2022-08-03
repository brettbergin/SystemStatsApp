import React, { useEffect, useState }  from "react";
import axios from "axios";
import Cookies from 'universal-cookie';

export default function DiskInfo() {
    const [itemRows, setItemRows] = useState([]);
    const cookies = new Cookies();

    useEffect(() => {
        async function fetch_disk_info() {    
          let access_token = cookies.get('access_token')
    
          let resp = await axios.get(
            'http://127.0.0.1:5000/api/disk/list',
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
    
        fetch_disk_info();
      }, [])

    return (
      <>
        <div>
            <h2>Disk Info</h2>
        </div>
        <div>
            <p>Here is the number of results: {itemRows.length}</p>
            <table border="true">
                <thead>
                    <tr>
                        <th>Timestamp</th>
                        <th>Target</th>
                        <th>Mount Pount</th>
                        <th>Total</th>
                        <th>Used</th>
                        <th>Free</th>
                        <th>Percent</th>
                    </tr>
                </thead>
                <tbody style={{ textAlign: "center" }}>
                    {itemRows.length && itemRows.map(({ id, timestamp, report_id, target, mount_point, total, used, free, percent }) => <tr key={id}>
                    <td>{timestamp}</td>
                    <td>{target}</td>
                    <td>{mount_point}</td>
                    <td>{total}</td>
                    <td>{used}</td>
                    <td>{free}</td>
                    <td>{percent}%</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
      </>
    );
}
