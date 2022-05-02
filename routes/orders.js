const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const user = req.session.id
    // const cookieID = req.session["users_id"]
    // console.log("cookieID:", cookieID)
    // res.render("index")
    db.query(`SELECT * FROM orders WHERE id = $1`, [user])
      .then(data => {
        const orders = data.rows;
        console.log(orders, user)
        const templateVars = {user, orders}
        res.render("orders", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/admin", (req, res) => {
    const user = req.session.id
    if (!user) {
      // alert('you must be logged in')
      return res.redirect('/api/login')
    }
    let adminCheck = '';
    db.query(`SELECT role FROM users WHERE id = $1`, [user])
    .then(data => {
      adminCheck = data.rows[0]
      console.log(adminCheck.role)
      if (adminCheck.role != 'admin') {
        return res.redirect('/api/login')
      }
    })
    db.query(`SELECT * FROM orders`)
    .then(data => {
      const orders = data.rows
      console.log(orders, user)
      const templateVars = {user, orders}
      res.render("orders", templateVars)
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  })
  return router;
};
