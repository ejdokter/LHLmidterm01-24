
const express = require ('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("cart");
    // db.query(`SELECT * FROM users;`)
    //   .then(data => {
    //     const users = data.rows;
    //     res.json({ users });
    //   })
    //   .catch(err => {
    //     res
    //       .status(500)
    //       .json({ error: err.message });
    //   });
  });
  return router;
};