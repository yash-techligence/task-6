const db = require("../db/db");

const getResults = (req, res) => {

  const sql = `
    SELECT * FROM results
  `;

  db.query(sql, (err, result) => {

    if (err) {

      console.log(err);

      return res.status(500).json({
        success: false,
        message: "Error fetching results"
      });

    }

    res.json({
      success: true,
      data: result
    });

  });

};

module.exports = {
  getResults
};