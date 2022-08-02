import {Link} from "react-router-dom";

export default function MustLogIn() {
    return (
        <div>
            <Link to="/login">Login</Link>
        </div>  
    );
}