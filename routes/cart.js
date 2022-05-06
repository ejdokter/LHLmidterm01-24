// This server page is for cart page get and post functions

const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {

    //if cookies are not present page redirects to home page
    if (!req.cookies["cart"]) {
      return res.redirect('/');
    }

    //getting cookies by JSON.parse and looping to get arrays of ids
    let presentCookie = JSON.parse(req.cookies["cart"]);
    let cookieIds = [];
    for (cokie of presentCookie) {
      cookieIds.push(cokie.id);
    }

    //if user is not present the page redirects to login page
    const user = req.session.id
    if (!user) {
      return res.redirect('/api/login');
    }

    //getting data from product table
    db.query(`SELECT * FROM products;`)
      .then(data => {
        products = data.rows;

        //filtering the products according to product ids in cookie
        products = products.filter(product => cookieIds.includes(product.id));

        //getting sum of all the prices from the filtered products
        let sum = 0;
        for (const prod of products) {
          sum += Number(prod.price);
        }
        // passing variables user, products and sum to render the cart page
        const templateVars = { user, products, sum }
        res.render("cart", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    });


    // [1] Grab the variables from request body
    // [2] Execute Database query to insert into Cart table
    // [3] on successful send api response

    // submit button post function
    router.post("/submit", (req, res) => {

      //getting user and admin values from cookie session
      const user = req.session.id.id;
      const admin = req.session.id

      // if admin role cookies is cleared and goes to home page
      if (admin.role === "admin") {
        res.clearCookie("cart")
        return res.redirect('/')
      }
      //console.log(user);
      //getting cookie named cart by JSON parsing
      let presentCookie = JSON.parse(req.cookies["cart"]);

      //creating cookieIds object and its key as cokie id
      let cookieIds = {};
      for (cokie of presentCookie) {
        if (cookieIds[cokie.id]) {
          cookieIds[cokie.id] += 1;
        } else {
          cookieIds[cokie.id] = 1;
        };
      }

      const dt = "May 5 2022";

      //inserting values in the orders table
      db.query(`INSERT INTO orders (user_id, status, created_at)
       VALUES ($1, $2, $3) RETURNING * ;`,
        [user, "active", dt]
      )
        .then((result) => {
          return result.rows[0];

        }).then(({ id }) => {
          const orderid = id;
          let queryString = `INSERT INTO line_items (order_id, product_id, quantity) VALUES `;
          const queryParams = [];
          for (const item in cookieIds) {
            queryParams.push(orderid, item, cookieIds[item]);
            const count = queryParams.length;
            queryString += `($${count - 2}, $${count - 1}, $${count}), `;

          }
          queryString = queryString.slice(0, -2);
          queryString += " RETURNING * ;";

          console.log(queryString, queryParams);

          return db.query(queryString, queryParams)
        }).then((data) => {
          console.log(data.rows);
        }
        )

      res.clearCookie("cart");
      return res.redirect('/api/orders')
    });

    /*
    //For stretch this url gets the values of all the product for testing
  // router.get("/users", (req, res) => { // /users => /api/cart/users
  //   db.query(`SELECT * FROM products;`)
  //     .then(data => {
  //       const products = data.rows;
  //       res.json({ products });
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // });
  */
  return router;
};
