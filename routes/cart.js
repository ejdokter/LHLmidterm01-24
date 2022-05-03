
const express = require ('express');
const router = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) =>{
// [1] Grab the variables from request body
// [2] Execute Database query to insert into Cart table
// [3] on successful send api response

// const addUser =  function(user) {
//   return pool
//   //adding query data and returning * to the end to return the objects that were inserted
//     .query(
//       `INSERT INTO users (name, email, password)
//     VALUES ($1, $2, $3) RETURNING * ;`,
//       [user.name, user.email, user.password]
//     ).then((result) =>{
//       return result.rows[0];
//     })
//     .catch((err) =>{
//       console.log(err.message);
//     });
// };

  });
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
