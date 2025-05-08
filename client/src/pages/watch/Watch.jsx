import "./watch.css"
import { ArrowBackOutlined } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

export default function Watch() {
    const location = useLocation()
    console.log(location);
    const movie = location.state.movie
    return (
        <div className="watch">
            <Link to="/">
                <div className="back">
                    <ArrowBackOutlined />
                    Home
                </div>
            </Link>
            <video className="video" autoPlay controls src={movie?.video} />
        </div>
    )
}