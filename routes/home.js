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
    let products;
    const user = req.session.id
    db.query(`SELECT * FROM products LIMIT 12;`)
    .then(data => {
     products = data.rows;
    //  console.log(products);
     const templateVars = {user, products}
     res.render("index", templateVars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });

    router.post("/submit", (req, res) => {
      const admin = req.session.id
      if (admin.role === "admin") {
        return res.redirect('/')
      }
    });
  });
  router.get("/users", (req, res) => {

    db.query(`SELECT * FROM products;`)
      .then(data => {
        const products = data.rows;
        res.json({ products });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};

