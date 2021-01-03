import Axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Popup from "reactjs-popup";
import backendUrl from "../config";
import RenderPost from "./RenderPost";

import "../Favourites.css";

function Favourites() {
  const [data, setData] = useState([]);
  const buttonRefs = useRef([]);
  buttonRefs.current = [];

  const fetchData = async () => {
    const res = await Axios.get(`${backendUrl}/users/me/favoriteExpresso`, {
      headers: { Authorization: localStorage.getItem("SavedToken") },
    });
    setData(res.data.userBookmarkedExpressos);

    //testing
    console.log(res.data.userBookmarkedExpressos);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div id="favourites">
        <h1>
          My Favourite <strong>Expresso</strong> Write-Ups
        </h1>
        <div className="user-fav-posts">
          {data.map((item, index) => {
            return (
              <div
                id="user-write-up"
                key={item.expresso._id}
                onClick={() => buttonRefs.current[index].open()}
              >
                <div>
                  <img
                    alt=""
                    src={
                      `${backendUrl}/` +
                      item.expresso.image.replace(
                        "http://localhost:3000/users/me/",
                        ""
                      )
                    }
                    style={{ height: 200, width: 200, objectFit: "contain" }}
                  />
                </div>
                <div>
                  <p>{item.expresso.title}</p>
                  <Popup
                    key={item.expresso._id}
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
                            item.expresso.image.replace(
                              "http://localhost:3000/users/me/",
                              ""
                            )
                          }
                          title={item.expresso.title}
                          category={item.expresso.category}
                          mainBlog={item.expresso.mainBlog}
                        />
                      </div>
                    )}
                  </Popup>
                  <p>{item.expresso.category}</p>
                  <p>
                    {item.expresso.mainBlog.substring(0, 100) + "  . . . . ."}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Favourites;
