-- initializes products table and it's columns/fields
CREATE TABLE products 
    (name varchar(50), description varchar(300), price varchar(20), image_path varchar(50));
-- populates products table rows with test data
INSERT INTO products 
    (name, description, price, image_path)
VALUES 
    ('name0', 'description0: Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'price0: $00.00', 'images/img_test.jpg'),
    ('name1', 'description1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'price1: $00.00', 'images/img_test.jpg'),
    ('name2', 'description2: Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'price2: $00.00', 'images/img_test.jpg'),
    ('name3', 'description3: Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'price3: $00.00', 'images/img_test.jpg'),
    ('name4', 'description4: Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'price4: $00.00', 'images/img_test.jpg'),
    ('name5', 'description5: Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'price5: $00.00', 'images/img_test.jpg'),
    ('name6', 'description6: Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'price6: $00.00', 'images/img_test.jpg'),
    ('name7', 'description7: Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'price7: $00.00', 'images/img_test.jpg'),
    ('name8', 'description8: Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'price8: $00.00', 'images/img_test.jpg'),
    ('name9', 'description9: Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'price9: $00.00', 'images/img_test.jpg');