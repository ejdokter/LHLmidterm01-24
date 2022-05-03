
const express = require ('express');
const router = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    let products;
    const user = req.session.id
    db.query(`SELECT * FROM products LIMIT 10;`)
    .then(data => {
     products = data.rows;
     console.log(products);
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
router.post("/home/:user_id/delete", (req, res) =>{
  let carts;
  const user=req.session.id;
  db.query(`DELETE * FROM cart WHERE user_id = $1 RETURNING * ;`, [user])
  .then((result) => {
    carts = data.rows;
    console.result(carts);
    const tempCarts= {user, carts};
    res.render ("cart", templateVars);
  })
  .catch (err => {
    res
    .status(500)
    .json({error: error.message})
  })
});

router.post("/home/:user_id/delete", (req, res) =>{
  let carts;
  const user=req.session.id;
  db.query(`INSERT INTO carts (name, description, category, price)
  VALUES ($1, $2, $3, $4) RETURNING * ;`,
     [cart.name, cart]
    )
  .then((result) => {
    carts = data.rows;
    console.result(carts);
    const tempCarts= {user, carts};
    res.render ("cart", templateVars);
  })
  .catch (err => {
    res
    .status(500)
    .json({error: error.message})
  })
});
  //let cards;
 // const users =req.session.id;

//     db.query(
//       `INSERT INTO carts (name, description, category, price)
//     VALUES ($1, $2, $3, $4) RETURNING * ;`,
//       [cart.name, cart]
//     ).then((result) =>{
//       return result.rows[0];
//     })
//     .catch((err) =>{
//       console.log(err.message);
//     });
// })

 // }};




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
