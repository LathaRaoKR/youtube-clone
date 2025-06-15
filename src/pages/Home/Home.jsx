import React, { useState } from "react";
import "./home.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Feed from "../../components/Feed/Feed";

const Home = ({ sidebar }) => {
  const [category, setCategory] = useState(0);

  return (
    <div className="home-wrapper">
      {/* Sidebar Navigation */}
      <Sidebar
        sidebar={sidebar}
        category={category}
        setCategory={setCategory}
      />

      {/* Main Video Feed Area */}
      <div className={`container ${sidebar ? "" : "large-container"}`}>
        <Feed category={category} />
      </div>
    </div>
  );
};

export default Home;
