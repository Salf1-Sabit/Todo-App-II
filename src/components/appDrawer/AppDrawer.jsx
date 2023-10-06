import React from "react";

import "./appDrawer.css";

// Icons
import TodayIcon from "@mui/icons-material/Today";
import UpcomingIcon from "@mui/icons-material/Upcoming";

const App = () => {
  return (
    <div className="appDrawer">
      <div className="appDrawer-top">
        <div className="appDrawer-items">
          <TodayIcon />
          <p>Today</p>
        </div>
        <div className="appDrawer-items">
          <UpcomingIcon />
          <p>Upcoming</p>
        </div>
      </div>
    </div>
  );
};

export default App;
