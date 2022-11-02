import React, { useState, useEffect, useReducer } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "../component/Header";
import VesselLookup from "../component/VesselLookup";
import MyVessel from "../component/MyVessel";
import VesselEnroll from "../component/VesselEnroll";
import VesselDetail from "../component/VesselDetail";
import BlockDetail from "../component/BlockDetail";

const Usermain = () => {
  const [userdata, setUserData] = useState({});

  useEffect(() => {
    fetch("http://34.64.185.37:8080/v1/client", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("access_token"),
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setUserData(result);
        localStorage.setItem("is_our_client", true);
      })
      .catch((error) => console.log("error".error));
  }, []);

  return (
    <div className="Usermain">
      <Header userdata={userdata} />
      <Routes>
        <Route path="/vessellookup" element={<VesselLookup />} />
        <Route path="/myvessel/*" element={<MyVessel />} />
        <Route path="/vesselenroll" element={<VesselEnroll />} />
        <Route path="/myvessel/vesseldetail/*" element={<VesselDetail />} />
        <Route
          path="/myvessel/vesseldetail/blockdetail"
          element={<BlockDetail />}
        />
      </Routes>
    </div>
  );
};

export default Usermain;
