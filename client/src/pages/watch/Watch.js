import React from "react";
import { ArrowBackOutlined, Movie } from "@material-ui/icons";
import "./watch.scss";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
const Watch = () => {
  const location = useLocation();
  const movie = location.movie;
  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <ArrowBackOutlined />
          Home
        </div>
      </Link>
      <video className="video" autoPlay progress controls src={movie} />
    </div>
  );
};

export default Watch;
