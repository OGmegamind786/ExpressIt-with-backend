import React, { useEffect, useRef, useState } from "react";
import "../Profile.css";
import Axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Popup from "reactjs-popup";
import RenderPost from "./RenderPost";
import backendUrl from "../config";

function Profile() {
  const history = useHistory();

  const [data, setData] = useState({});
  const [totalExpressos, settotalExpressos] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  // const [totalFavExpressos, setTotalFavExpressos] = useState(0);
  const [flag, setFlag] = useState(false);

  const [expressos, setExpressos] = useState([]);
  const buttonRefs = useRef([]);
  buttonRefs.current = [];

  const fetchData = async () => {
    const res = await Axios.get(`${backendUrl}/users/me/profile`, {
      headers: { Authorization: localStorage.getItem("SavedToken") },
    });
    setData(res.data);
    setExpressos(res.data.userExpressos);
    settotalExpressos(res.data.userExpressos.length);
    // setTotalFavExpressos(res.data.userBookmarkedExpressos.length);
    // buttonRef.current = new Array(res.data.userExpressos.length);

    setImageUrl(res.data.image);
    //testing purpose only
    console.log(res.data);
    console.log(res.data.userExpressos);
  };
  useEffect(() => {
    fetchData();
  }, [flag]);

  const deletePost = async (e_id) => {
    setFlag(!flag);
    console.log("clicked");
    console.log(e_id);
    await Axios.post(
      `${backendUrl}/users/me/deleteExpresso`,
      { expresso_id: e_id },
      {
        headers: { Authorization: localStorage.getItem("SavedToken") },
      }
    );
    window.location.reload();
    history.push("/users/me/profile");
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="profile row justify-content-around">
          <div className="user-bar col-md-3">
            <h1 id="welcome">Welcome {data.name}</h1>
            <br />

            <div>
              <img
                alt=""
                src={
                  `${backendUrl}/` +
                  imageUrl.replace("http://localhost:3000/users/me/", "")
                }
                style={{ height: 100, width: 100, objectFit: "contain" }}
              />
            </div>

            <div className="create">
              <Link to="/users/me/createExpresso">
                + Create a New Expresso Write-Up
              </Link>
            </div>
            <br />

            <div className="create">
              {/* <h2 id="data">{totalFavExpressos}</h2> */}
              <Link to="/users/me/favoriteExpresso">Favourites</Link>
            </div>

            <div className="create ">
              <h2 id="data">{totalExpressos}</h2>
              Total Expresso Write-Ups
            </div>

            <div className="create">
              <h2 id="data">.</h2>
              Chat Cafe
            </div>
            <div>
              <Link to="/users/me/createProfile">
                <h4 id="data">Update Profile</h4>
              </Link>
            </div>
          </div>

          <div className="user-content col-md-6">
            <div id="user-bio">
              <div id="user-info">
                <h1>User {data.name}</h1>
                <h3>Age :{data.age}</h3>
                <div id="about-user">
                  About
                  <div>{data.userDescription}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="user-pic col-md-2"></div>
        </div>
        {!totalExpressos ? (
          <div>No user expressos</div>
        ) : (
          <div id="user-posts">
            {expressos.map((item, index) => (
              <>
                <div
                  id="user-write-up"
                  key={item.expresso._id}
                  onClick={() => buttonRefs.current[index].open()}
                >
                  <div style={{ position: "relative" }}>
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
                    {/* delete button favicon below */}
                    <i
                      style={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                      }}
                      onClick={() => deletePost(item.expresso._id)}
                      class="fas fa-trash-alt"
                    ></i>
                  </div>
                  <div style={{ position: "relative" }}>
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
              </>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
