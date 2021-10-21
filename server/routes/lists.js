const express = require("express");
const router = express();
const List = require("../models/List");
const verify = require("../middleware/verifyToken");

//Create

router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newList = new List(req.body);
    try {
      const saveList = await newList.save();
      res.status(201).json({
        message: "The movie List has been created successfully",
        saveList,
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
  const { id } = req.params;
  if (req.user.isAdmin) {
    try {
      await List.findByIdAndRemove(id);

      res.status(201).json({
        message: `The  List has been Deleted  ${id}`,
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  } else {
    res.status(403).json("You are not allow !");
  }
});

//GET

router.get("/", verify,async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  let list = [];
  try {
    if (typeQuery) { //series 
      if (genreQuery) {  //thriller 
        list = await List.aggregate([
          { $sample: { size: 10 } }, //see only 10 data 
          { $match: { type: typeQuery, genre: genreQuery } }, //match  are where type = series and genre = thriller
        ]);
      }else{
          list = await List.aggregate([
            { $sample: { size: 10 } }, //see only 10 data any random will see
            { $match: { type: typeQuery } }, //match  are where type = series 
          ])
      }
    } else {
      list = await List.aggregate([{ $sample: { size: 10 } }]);
    }res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = router;
