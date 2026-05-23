const express = require("express");

const router = express.Router();

const {
  getResults
} = require("../controllers/resultsController");

router.get("/", getResults);

module.exports = router;