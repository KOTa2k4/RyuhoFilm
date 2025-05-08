import "./navbar.css"
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import { logout } from "../../authContext/AuthAction";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { dispatch } = useContext(AuthContext)

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null)
    }
    console.log(isScrolled)
    return (
        <div className={isScrolled ? "navbar scrolled" : "navbar"}>
            <div className="container">
                <div className="left">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                        alt=""
                    />
                    <Link to="/" className="link">
                        <span>Homepage</span>
                    </Link>
                    <Link to="/series" className="link">
                        <span className="navbarmainLinks">Series</span>
                    </Link>
                    <Link to="/movies" className="link">
                        <span className="navbarmainLinks">Movies</span>
                    </Link>
                    <Link to="/" className="link">
                        <span>New and Popular</span>
                    </Link>
                    <Link to="/" className="link">
                        <span>My list</span>
                    </Link>
                </div>
                <div className="right">
                    <SearchIcon className="icon" />
                    <span>KID</span>
                    <NotificationsIcon className="icon" />
                    <img src="https://ix-marketing.imgix.net/bg-remove_after.png?auto=format,compress&w=1946" alt="" />
                    <div className="profile">
                        <ArrowDropDownIcon />
                        <div className="options">
                            <span>Setting</span>
                            <span onClick={(e) => dispatch(logout())}>Logout</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
export default Navbar