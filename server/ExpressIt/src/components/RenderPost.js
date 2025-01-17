import React from "react";

function RenderPost(props) {
  const { title, category, mainBlog, imageSrc } = props;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        alt=""
        src={imageSrc}
        style={{ height: "50%", width: "50%", objectFit: "contain" }}
      />
      <br />
      <p>Post</p>
      <div className="header">{title}</div>
      <br />
      <div>{category}</div>
      <br />
      <div className="content">{mainBlog}</div>
    </div>
  );
}

export default RenderPost;
