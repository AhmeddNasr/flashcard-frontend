import './logo.png'
import { Link } from 'react-router-dom'
function Navigation() {
    return (
        <div id="navbar">
            <p id="logo">MyInfo</p>
                <div id="navbar-controls">
                    <Link to="/study">Services</Link>
                    <a >Contact</a>
                    <a >Donate</a>
                    <a >About</a>
                    <a >My Account</a>
                    <button>Login</button>
                </div>
        </div>
    )
}

export default Navigation;