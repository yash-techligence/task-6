const express = require("express");

const router = express.Router();

const { getResults } = require("../controllers/resultsController");

/* REMOVED verifyToken */

router.get("/", getResults);

module.exports = router;