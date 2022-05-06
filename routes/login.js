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
    const templateVars = {user}
    res.render("login", templateVars)
  //   // db.query(`SELECT * FROM products WHERE category = 'cereal' LIMIT 20;`)
  //   //   .then(data => {
  //   //     const products = data.rows;
  //   //     console.log(products)
  //   //     const templateVars = {products}
  //   //     res.render("index", templateVars);
  //   //   })
  //   //   .catch(err => {
  //   //     res
  //   //       .status(500)
  //   //       .json({ error: err.message });
  //   //   });
  });

  router.get("/:id", (req, res) => {
    req.session.id = req.params.id
    db.query(`SELECT id, name, role FROM users WHERE id = $1`, [req.session.id])
      .then(data => {
        const user = data.rows[0]
        req.session.id = user
        console.log(user)
        res.redirect("/")
      })
      .catch((err) => {
        res.status(500).json({ error: err.message })
      })
  })

  router.post('/logout', (req, res) => {
    req.session = null
    res.clearCookie("cart")
    res.redirect('/api/login')

  })
  // router.post("/alice", (req, res) => {
  //   db.query(`SELECT id FROM users WHERE name = 'Alice' AND role = 'user'`)
  //     .then(data => {
  //       console.log(data.rows[0])
  //       const user = data.rows[0]
  //       req.session.id = user
  //       res.redirect("/")
  //     })
  // })

  // router.post("/kira", (req, res) => {
  //   db.query(`SELECT id FROM users WHERE name = 'Kira' AND role = 'user'`)
  //     .then(data => {
  //       console.log(data.rows[0])
  //       const user = data.rows[0]
  //       req.session.id = user
  //       res.redirect("/")
  //     })
  // })

  // router.post("/bruce", (req, res) => {
  //   db.query(`SELECT id FROM users WHERE name = 'Bruce' AND role = 'user'`)
  //     .then(data => {
  //       console.log(data.rows[0])
  //       const user = data.rows[0]
  //       req.session.id = user
  //       res.redirect("/")
  //     })
  // })

  // router.post("/kevin", (req, res) => {
  //   db.query(`SELECT id FROM users WHERE name = 'Kevin' AND role = 'admin'`)
  //     .then(data => {
  //       console.log(data.rows[0])
  //       const user = data.rows[0]
  //       req.session.id = user
  //       res.redirect("/")
  //     })
  // })

  // router.post("/carol", (req, res) => {
  //   db.query(`SELECT id FROM users WHERE name = 'Carol' AND role = 'admin'`)
  //     .then(data => {
  //       console.log(data.rows[0])
  //       const user = data.rows[0]
  //       req.session.id = user
  //       res.redirect("/")
  //     })
  // })

  return router;
};
