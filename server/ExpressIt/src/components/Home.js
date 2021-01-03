import React, { useEffect } from "react";
import "../Home.css";
import Landing from "../components/Landing";
import About from "../components/About";
import Contact from "../components/Contact";

function Home() {
  useEffect(() => {
    console.log(process.env);
  }, []);
  return (
    <div>
      <Landing />
      <About />
      <Contact />
    </div>
  );
}

export default Home;
