-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS line_items CASCADE;
CREATE TABLE line_items (
  id SERIAL PRIMARY KEY NOT NULL,
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL
);
