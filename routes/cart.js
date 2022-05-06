
const express = require('express');
const router = express.Router();


module.exports = (db) => {


  router.get("/", (req, res) => {
    //let presentCookie = JSON.parse(getCookie("cart", req));
    if (!req.cookies["cart"]) {
      return res.redirect('/');
    }
    let presentCookie = JSON.parse(req.cookies["cart"]);

    let cookieIds = [];
    for (cokie of presentCookie) {
      cookieIds.push(cokie.id);
    }
    //console.log(cookieIds);
    const user = req.session.id
    if (!user) {
      return res.redirect('/api/login')
    }
    // let cart = req.cookies;
    //console.log(cart);
    //const user1 = req.session.id
    db.query(`SELECT * FROM products;`)
      .then(data => {
        products = data.rows;
        products = products.filter(product => cookieIds.includes(product.id));

        console.log(products);
        let sum = 0;
        for (const prod of products) {
          sum += Number(prod.price);
        }
        const templateVars = { user, products, sum }
        res.render("cart", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    });
    //
    // [1] Grab the variables from request body
    // [2] Execute Database query to insert into Cart table
    // [3] on successful send api response


    router.post("/submit", (req, res) => {
      console.log("submit button pressed");
      let carts;
      const user = req.session.id.id;
      const admin = req.session.id

      if (admin.role === "admin") {
        res.clearCookie("cart")
        return res.redirect('/')
      }
      console.log(user);
      let presentCookie = JSON.parse(req.cookies["cart"]);

      let cookieIds = {};
      for (cokie of presentCookie) {
        if (cookieIds[cokie.id]) {
          cookieIds[cokie.id] += 1;
        } else {
          cookieIds[cokie.id] = 1;
        };
      }
      console.log(cookieIds);
      const dt = "May 5 2022";


      db.query(`INSERT INTO orders (user_id, status, created_at)
       VALUES ($1, $2, $3) RETURNING * ;`,
        [user, "active", dt]
      )
        .then((result) => {
          //console.log(result.rows);
          return result.rows[0];
          //   carts = data.rows;
          //   console.result(carts);
          //   const tempCarts= {user, carts};
          //   res.render ("cart", templateVars);

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
      // .catch (err => {
      //   res
      //   .status(500)
      //   .json({error: error.message})
      // })
      res.clearCookie("cart");
      return res.redirect('/api/orders')
    });

  //});

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
