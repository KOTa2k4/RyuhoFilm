import "./list.css"
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from "@mui/icons-material";
import ListItem from "../listItem/ListItem";
import { useRef, useState } from "react";

export default function List({ list }) {

    const [isMoved, setIsMoved] = useState(false);
    const [slideNumber, setSlideNumber] = useState(0);

    const listRef = useRef()

    const handleClick = (direction) => {
        setIsMoved(true)
        let distance = listRef.current.getBoundingClientRect().x - 50;
        if (direction === "left" && slideNumber > 0) {
            setSlideNumber(slideNumber - 1)
            listRef.current.style.transform = `translateX(${230 + distance}px)`;
        }
        if (direction === "right" && slideNumber < 5) {
            setSlideNumber(slideNumber + 1)
            listRef.current.style.transform = `translateX(${-230 + distance}px)`;
        }
    }
    return (
        <div className="list">
            <span className="listTitle">{list?.title || "No Title Available"}</span>
            <div className="wrapper">
                <ArrowBackIosOutlined
                    className="sliderArrow left"
                    onClick={() => handleClick("left")}
                    style={{ display: !isMoved && "none" }}
                />
                <div className="container" ref={listRef}>
                    {list?.content?.length > 0 ? (
                        list.content.map((item, i) => (
                            <ListItem key={i} index={i} item={item} />)
                        )) : (
                        <p>Loading data...</p>
                    )}

                </div>
                <ArrowForwardIosOutlined className="sliderArrow right" onClick={() => handleClick("right")} />
            </div>
        </div>
    )
}