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
    db.query(`SELECT * FROM orders WHERE user_id = $1;`, [user.id])
      .then(data => {
        const orders = data.rows;
        // console.log(orders, user)
        const templateVars = {user, orders}
        if (user.role === 'admin') {
          // console.log("user:", user, "orders:", orders)
          return res.render("admin-orders", templateVars)
        }
        db.query(`SELECT order_id, products.name, product_id, quantity FROM line_items JOIN products ON product_id = products.id;`)
        .then(data => {
          const lineItems = data.rows
          const templateVars = {user, orders, lineItems}
          // console.log(lineItems)
          res.render("orders", templateVars)
        })
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
    db.query(`SELECT role FROM users WHERE id = $1;`, [user.id])
    .then(data => {
      adminCheck = data.rows[0]
      // console.log(adminCheck.role)
      if (adminCheck.role != 'admin') {
        return res.redirect('/api/login')
      }
    })
    db.query(`SELECT orders.*, users.name FROM orders JOIN users ON user_id = users.id WHERE status != 'cancelled' ORDER BY orders.id;`)
    .then(data => {
      const orders = data.rows
      console.log(orders, user)
      // db.query(`SELECT line_items.order_id, users.name, products.name, line_items.product_id, line_items.quantity FROM products JOIN line_items ON product_id = products.id JOIN users ON user_id = users.id;`)
      db.query(`SELECT order_id, products.name, product_id, quantity FROM line_items JOIN products ON product_id = products.id;`)
      .then(data => {
        const lineItems = data.rows
        const templateVars = {user, adminCheck, orders, lineItems}
        // console.log(lineItems)
        res.render("admin-orders", templateVars)
      })

    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  })

  router.post("/admin/accept", (req, res) => {
    const user = req.session.id
    const orderId = req.body.order_id
    console.log(req.body.order_id)
    db.query(`UPDATE orders SET status = 'in progress' WHERE id = $1;`, [orderId])
    .then(() => {
      res.redirect("/api/orders/admin")
      console.log('success')
    })
  })

  router.post("/admin/reject", (req, res) => {
    const user = req.session.id
    const orderId = req.body.order_id
    console.log(req.body.order_id)
    db.query(`UPDATE orders SET status = 'cancelled' WHERE id = $1;`, [orderId])
    .then(() => {
      res.redirect("/api/orders/admin")
      console.log('success')
    })
  })

  return router;
};
