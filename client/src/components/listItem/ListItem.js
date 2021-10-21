import React, { useState, useEffect } from "react";
import "./listItem.scss";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from "@material-ui/icons";
import axios from "axios";
import { Link } from "react-router-dom";

const ListItem = ({ index, items }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setmovie] = useState({});

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/movies/find/${items}`,
          {
            headers: {
              "x-auth-token":
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNDljOWY4OGZhMzNkNDYxNzA0YzcwZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzMzI2OTkxMSwiZXhwIjoxNjMzNDQyNzExfQ.sZkVlKlS-PdCYnKcEefFYYLmHVGRiWFSHFaUmv2tnUw",
            },
          }
        );
        setmovie(res.data.movie);
        console.log(res.data.movie);
      } catch (error) {
        console.log(error);
      }
    };
    getMovie();
  }, []);

  return (
    <Link to={{ pathname: "/watch", movie: movie }}>
      <div
        className="listItem"
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={movie?.img} alt={movie.img} />
        {isHovered && (
          <>
            <video src={movie.trailer} autoPlay={true} loop />
            <div className="itemInfo">
              <div className="icons">
                <PlayArrow className="icon" />
                <Add className="icon" />
                <ThumbUpAltOutlined className="icon" />
                <ThumbDownOutlined className="icon" />
              </div>
              <div className="itemInfoTop">
                <span>{movie.duration}</span>
                <span className="limit">{movie.limit}</span>
                <span>{movie.year}</span>
              </div>
              <div className="desc">{movie.desc}</div>
              <div className="genre">{movie.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};

export default ListItem;
