const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const user = req.session.id
    // const cookieID = req.session["users_id"]
    // console.log("cookieID:", cookieID)
    // res.render("index")
    db.query(`SELECT * FROM products WHERE category = 'cereal' LIMIT 20;`)
      .then(data => {
        const products = data.rows;
        console.log(products)
        const templateVars = {user, products}
        res.render("orders", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
