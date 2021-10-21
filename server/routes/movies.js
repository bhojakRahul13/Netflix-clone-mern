const express = require("express");
const router = express();
const Movie = require("../models/Movie");
const verify = require("../middleware/verifyToken");

//Create

router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newMovie = new Movie(req.body);
    try {
      const saveMovie = await newMovie.save();
      res.status(201).json({
        message: "The movie has been created successfully",
        saveMovie,
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  } else {
    res.status(403).json("You are not allow !");
  }
});

//UPDATE
router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const UpdatedMovie = await Movie.findById(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
        console.log("update",UpdatedMovie);
      res.status(200).json({
        message: "The movie has been  updated successfully",
        UpdatedMovie,
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  } else {
    res.status(403).json("You are not allow !");
  }
});

//DELETE
router.delete("/:id", verify, async (req, res) => {
  console.log("req",req.params.id);
  const {id} = req.params;
  if (req.user.isAdmin) {
    try {
    await Movie.findByIdAndDelete(id);
  
      res.status(200).json({ message: " The movie has been deleted..." });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  } else {
    res.status(403).json("You are not allow !");
  }
});

//GET

router.get("/find/:id", verify, async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);
    res
      .status(200)
      .json({ message: `The movie has been find by id ${id}`, movie });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

//GET RANDOM MOVIES
// 1) http://localhost:5000/api/movies/random
// 2) http://localhost:5000/api/movies/random?type=series or type=generic

router.get("/random", verify, async (req, res) => {
  const type = req.query.type;
  let movie;
  try {
    if (type === "series") {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }
    res
      .status(200)
      .json({ message: `Get the random series or generi data`, movie });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});


//GET ALL 
router.get("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
     const movies  =  await Movie.find();

      res.status(200).json({ message: " All  movies list" ,movies});
    } catch (error) {
      res.status(500).json({ message: error });
    }
  } else {
    res.status(403).json("You are not allow !");
  }
});


module.exports = router;
