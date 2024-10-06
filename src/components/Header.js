import { useState } from "react"
import { LOGO_URL } from "../utils/constants"
import { Link } from "react-router-dom"
import { FaCartArrowDown } from "react-icons/fa"



const Header = ()=>{
    const[isLoggedIn,setIsLoggedIn] = useState(false)
    return(
        <div className="header">
            <div className="logo-container">
                <Link to = "/"><img className="logo" src={LOGO_URL} alt="Spoons & Forks" /></Link>    
            </div>
            <div className="nav-items">
                <ul>
                    <li className="nav-links"><Link to="/">Home</Link></li>
                    <li className="nav-links"><Link to="/about">About</Link></li>
                    <li className="nav-links"><Link to="/contact">Contact us</Link></li>
                    {/*<li className="nav-links"><Link to="/cart">Cart</Link></li>*/}
                    <li><Link className="nav-links"><FaCartArrowDown /></Link></li>
                    <button className="login" onClick={()=>setIsLoggedIn(!isLoggedIn)}>{isLoggedIn ? "Logout" : "Login"}</button>
                </ul>
            </div>
        </div>

    )
}
export default Header;