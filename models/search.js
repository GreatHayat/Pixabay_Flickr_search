const mongoose = require("mongoose");

const searchSchema = new mongoose.Schema({
  search_term: {
    type: String
  },
  search_date: {
    type: Date,
    default: Date.now
  },
  pixa_results: {
    type: Number
  },
  flickr_results:{
    type: Number
  }
});

const Search = mongoose.model("Search", searchSchema);

exports.Search = Search;
