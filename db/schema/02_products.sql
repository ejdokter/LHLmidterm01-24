-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS products CASCADE;
CREATE TABLE products (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  photo_url VARCHAR(255) NOT NULL,
  calories_per_serving INTEGER NOT NULL,
  price INTEGER NOT NULL,
  category VARCHAR(255) NOT NULL
);
