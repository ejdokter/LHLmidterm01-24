/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

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
        res.render("index", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
