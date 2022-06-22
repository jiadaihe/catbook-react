import React from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "611858752244-nln1lv5gg219d3v8pdddig8b24vl01sb.apps.googleusercontent.com";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = (props) => {
  return (
    <nav className="NavBar-container">
      <div className="NavBar-title u-inlineBlock">Plantbook</div>
      <div className="NavBar-linkContainer u-inlineBlock">
        
      </div>
    </nav>
  );
};

export default NavBar;
