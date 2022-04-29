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
    // const cookieID = req.session["users_id"]
    // console.log("cookieID:", cookieID)
    res.render("login")
    // db.query(`SELECT * FROM products WHERE category = 'cereal' LIMIT 20;`)
    //   .then(data => {
    //     const products = data.rows;
    //     console.log(products)
    //     const templateVars = {products}
    //     res.render("index", templateVars);
    //   })
    //   .catch(err => {
    //     res
    //       .status(500)
    //       .json({ error: err.message });
    //   });
  });

  router.post("/alice", (req, res) => {
    db.query(`SELECT id FROM users WHERE name = 'Alice'`)
      .then(data => {
        console.log(data.rows[0])
        const user = data.rows[0]
        req.session.id = user
        res.redirect("/")
      })
  })

  router.post("/kira", (req, res) => {
    db.query(`SELECT id FROM users WHERE name = 'Kira'`)
      .then(data => {
        console.log(data.rows[0])
        const user = data.rows[0]
        req.session.id = user
        res.redirect("/")
      })
  })

  router.post("/bruce", (req, res) => {
    db.query(`SELECT id FROM users WHERE name = 'Bruce'`)
      .then(data => {
        console.log(data.rows[0])
        const user = data.rows[0]
        req.session.id = user
        res.redirect("/")
      })
  })

  return router;
};
