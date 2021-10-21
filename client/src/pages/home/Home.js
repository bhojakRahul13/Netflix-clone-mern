import { useState, useEffect } from "react";
import Navbar from "../../components/navbar/NavBar";
import Featured from "../../components/featured/Featured";
import "./home.scss";
import List from "../../components/list/List";
import axios from "axios";

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/lists${type ? "?type=" + type : " "}${
            genre ? "&genre=" + genre : ""
          }`,
          {
            headers: {
              "x-auth-token":
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNDljOWY4OGZhMzNkNDYxNzA0YzcwZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzMzI2OTkxMSwiZXhwIjoxNjMzNDQyNzExfQ.sZkVlKlS-PdCYnKcEefFYYLmHVGRiWFSHFaUmv2tnUw",
            },
          }
        );
        setLists(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getRandomLists();
  }, [type, genre]);
  return (
    <div className="home">
      <Navbar />
      <Featured type={type} />
      {lists.map((list) => (
        <List list={list} />
      ))}
    </div>
  );
};

export default Home;
