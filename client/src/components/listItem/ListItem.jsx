import "./listItem.css"
import { Add, PlayArrow, ThumbDownAltOutlined, ThumbUpAltOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ListItem({ index, item }) {
    const [isHovered, setIsHovered] = useState(false);
    const [movie, setMovie] = useState({});

    useEffect(() => {
        const getMovie = async () => {
            try {
                const res = await axios.get("/movies/find/" + item
                    , {
                        headers: {
                            token:
                                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZGY5ZTQ2ZGRhNTA4M2MwNWFhMzgxZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTc0NjcwMDAwNiwiZXhwIjoxNzQ3MTMyMDA2fQ.wocfBFPUfwezE8FL48UsU7VASc84dCABs34JPv2HO5w"
                        },
                    });
                setMovie(res.data)
            } catch (err) {
                console.log(err);
            }
        };
        getMovie()
    }, [item]);

    return (
        <Link to="/watch" state={{ movie }}>
            <div className="listItem"
                style={{ left: isHovered && index * 255 - 50 + index * 2.5 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <img src={movie?.img}
                    alt="" />
                {isHovered && (
                    <>
                        <video src={movie?.trailer} autoPlay={true} loop />
                        <div className="itemInfo">
                            <PlayArrow className="icon" />
                            <Add className="icon" />
                            <ThumbUpAltOutlined className="icon" />
                            <ThumbDownAltOutlined className="icon" />
                        </div>
                        <div className="itemInfoTop">
                            <span>{movie?.duration}</span>
                            <span className="limit">+{movie?.limit}</span>
                            <span>{movie?.year}</span>
                        </div>
                        <div className="desc">
                            {movie?.desc}
                        </div>
                        <div className="genre">{movie?.genre}</div>
                    </>
                )}
            </div>
        </Link>
    )
}