import "./featured.css"
import { InfoOutlined, PlayArrow } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Featured({ type, setGenre }) {
    const [content, setContent] = useState({});

    useEffect(() => {
        const getRandomContent = async () => {
            try {
                const res = await axios.get(`/movies/random?type=${type}`
                    , {
                        headers: {
                            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZGY5ZTQ2ZGRhNTA4M2MwNWFhMzgxZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTc0NjcwMDAwNiwiZXhwIjoxNzQ3MTMyMDA2fQ.wocfBFPUfwezE8FL48UsU7VASc84dCABs34JPv2HO5w"
                        }
                    });
                setContent(res.data[0])
            } catch (err) {
                console.log(err)
            }
        }
        getRandomContent()
    }, [type]);

    console.log(content)
    return (
        <div className="featured">
            {type && (
                <div className="category">
                    <span>{type === "movies" ? "Movies" : "Series"}</span>
                    <select name="genre" id="genre" onChange={(e) => setGenre(e.target.value)}>
                        <option>Genre</option>
                        <option value="adventure">Adventure</option>
                        <option value="comedy">Comedy</option>
                        <option value="crime">Crime</option>
                        <option value="fantasy">Fantasy</option>
                        <option value="historical">Historical</option>
                        <option value="horror">Horror</option>
                        <option value="romance">Romance</option>
                        <option value="sci-fi">Sci-fi</option>
                        <option value="western">Western</option>
                        <option value="animation">Animation</option>
                        <option value="drama">Drama</option>
                        <option value="documentary">Documentary</option>
                    </select>
                </div>
            )}
            <img
                src={content.img}
                alt="" />
            <div className="info">
                <img src={content.imgTitle} alt="" />
                <span className="decs">{content.desc}</span>
                <div className="buttons">
                    <button className="play">
                        <PlayArrow />
                        <span>Play</span>
                    </button>
                    <button className="more">
                        <InfoOutlined />
                        <span>Info</span>
                    </button>
                </div>
            </div>
        </div>
    )
}