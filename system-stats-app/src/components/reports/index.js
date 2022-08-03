import React, { useEffect, useState }  from "react";
import axios from "axios";
import Cookies from 'universal-cookie';


export default function Reports() {
    const [itemRows, setItemRows] = useState([]);
    const cookies = new Cookies();

    useEffect(() => {
        async function fetch_reports() {    
          let access_token = cookies.get('access_token')
    
          let resp = await axios.get(
            'http://127.0.0.1:5000/api/report/list',
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
    
        fetch_reports();
      }, [])

    return (
        <>
        <div>
            <h2>Reports Page</h2>
        </div>
        <div>
            <p>Here is the number of results: {itemRows.length}</p>
            <table border="true">
                <thead>
                    <tr>
                        <th>User Email</th>
                        <th>Target</th>
                        <th>Timestamp</th>
                        <th>Report ID</th>
                    </tr>
                </thead>
                <tbody style={{ textAlign: "center" }}>
                    {itemRows.length && itemRows.map(({ id, user_id, timestamp, report_id, target, email }) => <tr key={id}>
                    <td>{email}</td>
                    <td>{target}</td>
                    <td>{timestamp}</td>
                    <td><a href="">{report_id}</a></td>
                    </tr>
                )}
                </tbody>
            </table>
        </div></>
    );
}
