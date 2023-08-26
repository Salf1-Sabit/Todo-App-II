import React from "react";

// ICONS
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import TaskIcon from "@mui/icons-material/Task";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import FeedbackIcon from "@mui/icons-material/Feedback";
import HelpIcon from "@mui/icons-material/Help";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const SidebarData = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    link: "/admin/dashboard",
  },
  {
    title: "Users",
    icon: <PeopleIcon />,
    link: "/admin/users",
  },
  {
    title: "Monitor Tasks",
    icon: <TaskIcon />,
    link: "/admin/tasks",
  },
  {
    title: "Analytics",
    icon: <AnalyticsIcon />,
    link: "/admin/analytics",
  },
  {
    title: "Users Feedback",
    icon: <FeedbackIcon />,
    link: "/admin/feedback",
  },
  {
    title: "Help and Information",
    icon: <HelpIcon />,
    link: "/admin/help",
  },
  {
    title: "Settings",
    icon: <SettingsIcon />,
    link: "/admin/settings",
  },
  {
    title: "Logout",
    icon: <LogoutIcon />,
    link: "/admin/logout",
  },
];

export default SidebarData;
