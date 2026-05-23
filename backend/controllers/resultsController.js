const db = require("../db/db");

const getResults = (req, res) => {

  const userId = req.user.id;

  const sql = `
    SELECT * FROM results
    WHERE user_id = ?
    ORDER BY id DESC
  `;

  db.query(sql, [userId], (err, result) => {

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