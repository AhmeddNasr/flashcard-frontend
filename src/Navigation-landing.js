import { Link } from 'react-router-dom'
function Navigation() {
    return (
        <div id="navbar">
            <p id="logo">MyInfo</p>
                <div id="navbar-controls">
                    <Link to="/study">Services</Link>
                    <Link to="/study">Contact</Link>
                    <Link to="/study">Donate</Link>
                    <Link to="/study">About</Link>
                    <Link to="/study">My Account</Link>
                    <button>Login</button>
                </div>
        </div>
    )
}

export default Navigation;