import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const navItems = [
  {
    id: 1,
    title: "Home",
    path: "./",
    cName: "nav-item",
  },
  {
    id: 2,
    title: "Explore",
    path: "./explore",
    cName: "nav-item",
  },
  {
    id: 3,
    title: <FontAwesomeIcon style={{fontSize:"2rem"}} icon=" fa-user" />,
    path: "./profile",
    cName: "nav-item",
  },
];

export const userDropdown = [
  {
    id: 1,
    title: "My Profile",
    path: "./myProfile",
    cName: "submenu-item",
  },
  {
    id: 2,
    title: "Create Profile",
    path: "./createProfile",
    cName: "submenu-item",
  },
  {
    id: 3,
    title: "Logut",
    path: "./logout",
    cName: "submenu-item",
  },
];
