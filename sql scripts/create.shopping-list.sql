


DROP TYPE IF EXISTS grocery;
CREATE TYPE grocery as ENUM (
  'Main',
  'Snack',
  'Lunch',
  'Breakfast'
  );

CREATE TABLE IF NOT EXISTS shopping_list (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(25),
  price DECIMAL(10, 2) NOT NULL,
  date_added TIMESTAMP DEFAULT now() NOT NULL,
  checked BOOLEAN DEFAULT false NOT NULL,
  category grocery NOT NULL
);

