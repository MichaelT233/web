-- initializes products table
CREATE TABLE products 
    (name varchar(50), description varchar(300), price varchar(10), image bytea);
-- populates products with data
INSERT INTO products 
    (name, description, price)
VALUES 
    ('p0 name', 'p0 desctription', 'p0 price');