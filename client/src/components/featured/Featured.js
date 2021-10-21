import React, { useState, useEffect } from "react";
import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import "./featured.scss";
import axios from "axios";

const Featured = ({ type }) => {
  const [content, setcontent] = useState({});

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/movies/random?type=${type}`,
          {
            headers: {
              "x-auth-token":
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNDljOWY4OGZhMzNkNDYxNzA0YzcwZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzMzI2OTkxMSwiZXhwIjoxNjMzNDQyNzExfQ.sZkVlKlS-PdCYnKcEefFYYLmHVGRiWFSHFaUmv2tnUw",
            },
          }
        );
        setcontent(res.data.movie[0]);

      } catch (error) {
        console.log(error);
      }
    };
    getRandomContent();
  }, [type]);
  
  console.log("content---->",content);
  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movies" ? "Movies" : "Series"}</span>
          <select name="genre" id="genre">
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
      <img src={content?.img} alt="netflix-feature" />
      <div className="info">
        <img src={content?.imgTitle} alt="info" />

        <span className="desc">{content.title}</span>
        <div className="buttons">
          <button className="play">
            <PlayArrow />
            <span>Play</span>
          </button>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
