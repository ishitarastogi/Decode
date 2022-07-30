import { NavLink, Link } from "react-router-dom";
import "./MainNavigation.css";
import Dropdown from "./Dropdown";
import { navItems } from "./NavItems";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useState} from 'react'
function MainNavigation() {

  const [dropdown, setDropdown] = useState(false);

 return (
   <>
     <nav className="navbar">
       <Link to="/" className="navbar-logo">
        <span className="code"> Decode </span><FontAwesomeIcon icon="fa-solid fa-code" />
       </Link>
         <ul className="nav-items">
         {navItems.map((item) => {
           if (item.path === "./profile") {
             return (
               <li
                 key={item.id}
                 className={item.cName}
                 onMouseEnter={() => setDropdown(true)}
                 onMouseLeave={() => setDropdown(false)}
               >
                 <Link to={item.path}>{item.title}</Link>
                 {dropdown && <Dropdown />}
                 
               </li>
             );
           }
           return (
             <li key={item.id} className={item.cName}>
               <Link to={item.path}>{item.title}</Link>
             </li>
           );
         })}
       </ul>
     </nav>
   </>
 );


}




export default MainNavigation;
    // <header>
    //   <nav>
    //     <ul>
    //       <li>
    //         <Link to="/">
    //           {" "}
    //           <div>De-Code</div>
    //         </Link>
    //       </li>

    //       <li>
    //         <Link to="/myProfile">My Profile</Link>
    //       </li>

    //       <li>
    //         <Link to="/createProfile">Create Profile</Link>
    //       </li>
    //     </ul>
    //   </nav>
    // </header>

    // <header>
    //   <nav>
    //     <ul>
    //       <li>
    //         <Link to="/">
    //           {" "}
    //           <div>De-Code</div>
    //         </Link>
    //       </li>

    //       <li>
    //         <Link to="/myProfile">My Profile</Link>
    //       </li>

    //       <li>
    //         <Link to="/createProfile">Create Profile</Link>
    //       </li>
    //     </ul>
    //   </nav>
    // </header>
