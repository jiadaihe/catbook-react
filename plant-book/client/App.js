import React, { useState } from "react";
import { Router } from "@reach/router";
import NavBar from "./NavBar.js";
import NotFound from "./NotFound.js";
import Plant from "./Plant.js";

const App = () => {
    const [userId, setUserId] = useState(null);

    const handleLogin = (res) => {
        console.log('currentUser:', res.profileObj);
        const userToken = res.tokenObj.id_token;
        console.log(userToken);

        post("/v1/auth/google", { token: userToken }).then((user) => {
          setUserId(user._id);
        });
    };
    
   
    return (
      // <> is like a <div>, but won't show
      // up in the DOM tree
      <>
        <NavBar />
        <div className="App-container">
            <Router>
                <Plant path="/" />
                <NotFound default />
            </Router>
        </div>
      </>
    );
  };
  

export default App;