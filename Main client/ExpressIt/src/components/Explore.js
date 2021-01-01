import React, { useEffect, useRef, useState } from "react";
import Axios from "axios";
import backendUrl from "../config";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import "../Explore.css";
import RenderPost from "./RenderPost";
import TinderCard from "react-tinder-card";
import Popup from "reactjs-popup";
import PullToRefresh from "react-simple-pull-to-refresh";

function Explore() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isFilterOn, setIsFilterOn] = useState(false);
  const [category, setCategory] = useState("");

  const buttonRefs = useRef([]);
  buttonRefs.current = [];

  useEffect(() => {
    const fetchData = async () => {
      const res = await Axios.get(`${backendUrl}/users/me/feed`, {
        headers: { Authorization: localStorage.getItem("SavedToken") },
      });
      setData(res.data);
      console.log(res.data);
    };
    fetchData();
  }, []);

  const onFilterData = async () => {
    const res = await Axios.get(`${backendUrl}/users/me/feed/search`, {
      headers: { Authorization: localStorage.getItem("SavedToken") },
      params: { category: category },
    });
    setFilteredData(res.data);
  };

  const handleFilterToggle = () => {
    setIsFilterOn(true);
    onFilterData();
  };

  const swiped = async (direction, expressoID) => {
    console.log("you swiped " + direction);
    if (direction === "right") {
      try {
        const dataToSend = {
          expresso_id: expressoID,
        };
        const res = await Axios.post(
          `${backendUrl}/users/me/addToFavorite`,
          dataToSend,
          {
            headers: { Authorization: localStorage.getItem("SavedToken") },
          }
        );
        console.log(res);
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <>
      <div id="explore">
        <h1>
          Explore <strong>Expresso</strong> Write-Ups
        </h1>
        <br />
        <h4>Start Swiping</h4>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          Category of your Expresso:
          <select
            name="category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            // onClick={handleFilterToggle}
          >
            <option value="">None</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Fashion">Fashion</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Music">Music</option>
            <option value="Art">Art</option>
            <option value="Fitness">Fitness</option>
            <option value="DIY">DIY</option>
            <option value="Sports">Sports</option>
            <option value="Finance">Finance</option>
            <option value="Business">Business</option>
            <option value="Personal">Personal</option>
            <option value="Movies/TV Show">Movies/TV Show</option>
            <option value="News">News</option>
            <option value="Fan Theory">Fan Theory</option>
          </select>
          <button
            style={{ height: 50, width: 80, fontSize: "16px" }}
            onClick={handleFilterToggle}
          >
            Filter List
          </button>
        </div>

        {isFilterOn ? (
          <div className="tinderCard-container">
            {filteredData.map((item, index) => {
              return (
                <TinderCard
                  className="swipe"
                  preventSwipe={["up", "down"]}
                  onSwipe={(dir) => swiped(dir, item._id)}
                >
                  <div
                    className="blog-card"
                    onDoubleClick={() => buttonRefs.current[index].open()}
                  >
                    <img
                      src={
                        `${backendUrl}/` +
                        item.image.replace(
                          "http://localhost:3000/users/me/",
                          ""
                        )
                      }
                      alt="dummy"
                      style={{
                        height: 500,
                        width: 500,
                        objectFit: "contain",
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <p>{item.title}</p>
                      <p>{item.category}</p>
                    </div>
                    <Popup
                      key={item._id}
                      ref={(ref) => (buttonRefs.current[index] = ref)}
                      trigger={
                        <button style={{ display: "none" }}>View me</button>
                      }
                      modal
                      overlayStyle={{
                        overflowY: "auto",
                        background: "black",
                      }}
                      closeOnDocumentClick="false"
                    >
                      {(close) => (
                        <div className="popup-content">
                          <button className="popup-close" onClick={close}>
                            &times;
                          </button>
                          <RenderPost
                            imageSrc={
                              `${backendUrl}/` +
                              item.image.replace(
                                "http://localhost:3000/users/me/",
                                ""
                              )
                            }
                            title={item.title}
                            category={item.category}
                            mainBlog={item.mainBlog}
                          />
                        </div>
                      )}
                    </Popup>
                  </div>
                </TinderCard>
              );
            })}
          </div>
        ) : (
          <div className="tinderCard-container">
            {data.map((item, index) => {
              return (
                <TinderCard
                  className="swipe"
                  preventSwipe={["up", "down"]}
                  onSwipe={(dir) => swiped(dir, item._id)}
                >
                  <div
                    className="blog-card"
                    onDoubleClick={() => buttonRefs.current[index].open()}
                  >
                    <img
                      src={
                        `${backendUrl}/` +
                        item.image.replace(
                          "http://localhost:3000/users/me/",
                          ""
                        )
                      }
                      alt="dummy"
                      style={{
                        height: 500,
                        width: 500,
                        objectFit: "contain",
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <p>{item.title}</p>
                      <p>{item.category}</p>
                    </div>
                    <Popup
                      key={item._id}
                      ref={(ref) => (buttonRefs.current[index] = ref)}
                      trigger={
                        <button style={{ display: "none" }}>View me</button>
                      }
                      modal
                      overlayStyle={{
                        overflowY: "auto",
                        background: "black",
                      }}
                      closeOnDocumentClick="false"
                    >
                      {(close) => (
                        <div className="popup-content">
                          <button className="popup-close" onClick={close}>
                            &times;
                          </button>
                          <RenderPost
                            imageSrc={
                              `${backendUrl}/` +
                              item.image.replace(
                                "http://localhost:3000/users/me/",
                                ""
                              )
                            }
                            title={item.title}
                            category={item.category}
                            mainBlog={item.mainBlog}
                          />
                        </div>
                      )}
                    </Popup>
                  </div>
                </TinderCard>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default Explore;
