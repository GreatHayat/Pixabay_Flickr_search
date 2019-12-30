const express = require("express");
const mongoose = require("mongoose");
const { Search } = require("../models/search");
const router = express.Router();

router.post("/", async (req, res) => {
  search = new Search({
    search_term: req.body.search_term,
    pixa_results: req.body.pixa_results,
    flickr_results: req.body.flickr_results
  });
  await search.save();
  res.send(search)
});

router.get("/", async(req, res)=>{
  const results = await Search.find();
  res.send(results)
});

router.get("/:id", async(req, res)=>{
  const result = await Search.findById(req.params.id);
	if (!result) {
		return res.status(404).send("Search History With That ID Doesn't Exists...");
	}
	res.send(result);
})
module.exports = router;
