import "./home.css"
import Navbar from "../../components/navbar/Navbar"
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = ({ type }) => {
    const [lists, setLists] = useState([]);
    const [genre, setGenre] = useState(null);

    useEffect(() => {
        const getRandomLists = async () => {
            try {
                const res = await axios.get(
                    `lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""
                    }`,
                    {
                        headers: {
                            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZGY5ZTQ2ZGRhNTA4M2MwNWFhMzgxZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTc0NjcwMDAwNiwiZXhwIjoxNzQ3MTMyMDA2fQ.wocfBFPUfwezE8FL48UsU7VASc84dCABs34JPv2HO5w"
                        }
                    }
                );
                console.log(res);
                setLists(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getRandomLists();
    }, [type, genre]);

    return (
        <div className="home">
            <Navbar />
            <Featured type={type} setGenre={setGenre} />
            {lists.map((list) => (
                <List key={list._id} list={list} />
            ))}
        </div>
    )
}
export default Home