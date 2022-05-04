
const express = require ('express');
const router = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    const user = req.session.id
    if (!user) {
      return res.redirect('/api/login')
    }
    let cart = req.cookies;
    console.log(cart);
    //const user1 = req.session.id
    db.query(`SELECT * FROM products LIMIT 10;`)
    .then(data => {
     products = data.rows;
     //console.log(products);
     const templateVars = {user, products}
     res.render("cart", templateVars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });

 //
// [1] Grab the variables from request body
// [2] Execute Database query to insert into Cart table
// [3] on successful send api response


// router.post("/api/cart/add", (req, res) =>{
//   let carts;
//   const user=req.session.id;
//   db.query(`INSERT INTO products (name, description, category, price)
//   VALUES ($1, $2, $3, $4) RETURNING * ;`,
//      [cart.name, cart]
//     )
//   .then((result) => {
//     carts = data.rows;
//     console.result(carts);
//     const tempCarts= {user, carts};
//     res.render ("cart", templateVars);
//   })
//   .catch (err => {
//     res
//     .status(500)
//     .json({error: error.message})
//   })
// });



  });

  router.get("/users", (req, res) => { // /users => /api/cart/users
    // const user = req.session.id
    // const templateVars = {user}
    // res.render("cart", templateVars);


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
