import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

import "../css/Account.css";

function Account() {
  const [userInformation, setUserInformation] = useState("");

  useEffect(() => {
    axios.get(`/user/information`).then((res) => {
      console.log(res.data)
    });
  }, []);

  return (
    <>
      <di>
        <div className="background-account">{userInformation}</div>
      </di>
    </>
  );
}

export default Account;
