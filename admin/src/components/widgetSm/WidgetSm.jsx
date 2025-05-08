import { useEffect, useState } from "react";
import "./widgetSm.css";
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from "axios";

export default function WidgetSm() {
  const [newUsers, setNewUsers] = useState([]);

  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const res = await axios.get("/users?new=true", {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZGY5ZTQ2ZGRhNTA4M2MwNWFhMzgxZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTc0NjAwOTcwNywiZXhwIjoxNzQ2NDQxNzA3fQ.LqF-nlmn_LvDTAZu6t8g_Sfyspud4ShkPmvGHLpdPMU"
          },
        });
        setNewUsers(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getNewUsers()
  }, [])
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUsers.map(user => (
          <li className="widgetSmListItem">
            <img
              src={user.profilePick || "https://i.pinimg.com/564x/1b/a2/e6/1ba2e6d1d4874546c70c91f1024e17fb.jpg"}
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
            </div>
            <button className="widgetSmButton">
              <VisibilityIcon className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
