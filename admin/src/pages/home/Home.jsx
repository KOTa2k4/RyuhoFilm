import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useState, useMemo } from "react";
import axios from "axios"

export default function Home() {
  const MONTHS = useMemo(() => [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Agu",
    "Oct",
    "Nov",
    "Dec",
  ], []
  )
  const [userStats, setUserStats] = useState([]);

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get('/users/stats', {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZGY5ZTQ2ZGRhNTA4M2MwNWFhMzgxZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTc0NjAwOTcwNywiZXhwIjoxNzQ2NDQxNzA3fQ.LqF-nlmn_LvDTAZu6t8g_Sfyspud4ShkPmvGHLpdPMU"
          },
        });
        const statsList = res.data.sort(function (a, b) {
          return a._id - b._id;
        })
        statsList.map(item => setUserStats(prev => [...prev, {
          name: MONTHS[item._id - 1], "New User": item.total
        }]))
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [MONTHS])

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="New User" />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
