-- initializes products table and it's columns/fields
CREATE TABLE products 
    (name varchar(50), description varchar(300), price varchar(20), image_path varchar(50));
-- populates products table rows with test data
INSERT INTO products 
    (name, description, price, image_path)
VALUES 
    ('p0 name ', 'p0 description ', 'p0 price ', 'images/img_test.jpg'),
    ('p1 name ', 'p1 description ', 'p1 price ', 'images/img_test.jpg'),
    ('p2 name ', 'p2 description ', 'p2 price ', 'images/img_test.jpg'),
    ('p3 name ', 'p3 description ', 'p3 price ', 'images/img_test.jpg'),
    ('p4 name ', 'p4 description ', 'p4 price ', 'images/img_test.jpg'),
    ('p5 name ', 'p5 description ', 'p5 price ', 'images/img_test.jpg'),
    ('p6 name ', 'p6 description ', 'p6 price ', 'images/img_test.jpg'),
    ('p7 name ', 'p7 description ', 'p7 price ', 'images/img_test.jpg'),
    ('p8 name ', 'p8 description ', 'p8 price ', 'images/img_test.jpg'),
    ('p9 name ', 'p9 description ', 'p9 price ', 'images/img_test.jpg');