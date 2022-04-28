const { Pool } = require("pg");
const dbParams = require("../lib/db")
const db = new Pool(dbParams)

const getAllProducts = function(limit = 20) {
  const queryString = `SELECT * FROM products LIMIT $1;`

  db.query(queryString, [limit]).then(res => {
    return res.rows
  })
}

exports.getAllProducts = getAllProducts
