const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const user = req.session.id
    if (!user) {
      return res.redirect('/api/login')
    }
    // let adminCheck = ''
    // db.query(`SELECT role FROM users WHERE id = $1`, [user])
    // .then(data => {
    //   adminCheck = data.rows[0]
    //   console.log(adminCheck.role)
      // if (adminCheck.role === 'admin') {
      //   return res.render("admin-orders", templateVars)
    // })
    // const cookieID = req.session["users_id"]
    // console.log("cookieID:", cookieID)
    // res.render("index")
    db.query(`SELECT * FROM orders WHERE id = $1`, [user.id])
      .then(data => {
        const orders = data.rows;
        console.log(orders, user)
        const templateVars = {user, orders}
        if (user.role === 'admin') {
          console.log("user:", user, "orders:", orders)
          return res.render("admin-orders", templateVars)
        }
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
    db.query(`SELECT role FROM users WHERE id = $1`, [user.id])
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
      const templateVars = {user, adminCheck, orders}
      res.render("admin-orders", templateVars)
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  })
  return router;
};
