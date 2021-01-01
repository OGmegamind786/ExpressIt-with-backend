import React, { useEffect } from "react";
import "../Home.css";
import Navbar from "../components/Navbar";
import Landing from "../components/Landing";
import About from "../components/About";
import Contact from "../components/Contact";
import Profile from "../components/Profile";
import CreateProfile from "../components/CreateProfile";
import CreateExpresso from "../components/CreateExpresso";
import Explore from "../components/Explore";
import Favourites from "../components/Favourites";

function Home() {
  useEffect(() => {
    console.log(process.env);
  }, []);
  return (
    <div>
      {/* <Navbar /> */}
      <Landing />
      <About />
      <Contact />

      {/* <Profile /> */}

      {/* <CreateExpresso /> */}
      {/* <Explore /> */}
      {/* <Favourites /> */}
      {/* <CreateProfile / */}
    </div>
  );
}

export default Home;
