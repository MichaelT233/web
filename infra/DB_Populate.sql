-- initializes products table and it's columns/fields
CREATE TABLE products 
    (id varchar(4), title varchar(50), price varchar(20), descr varchar(300), image_path varchar(50));
-- populates products table rows with test data
INSERT INTO products 
    (id, title, price, descr, image_path)
VALUES 
    ('0000', 'title0', 'price0: $00.00', 'descr0: Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'images/img_test.jpg'),
    ('0001', 'title1', 'price1: $00.00', 'descr1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'images/img_test.jpg'),
    ('0002', 'title2', 'price2: $00.00', 'descr2: Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'images/img_test.jpg'),
    ('0003', 'title3', 'price3: $00.00', 'descr3: Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'images/img_test.jpg'),
    ('0004', 'title4', 'price4: $00.00', 'descr4: Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'images/img_test.jpg'),
    ('0005', 'title5', 'price5: $00.00', 'descr5: Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'images/img_test.jpg'),
    ('0006', 'title6', 'price6: $00.00', 'descr6: Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'images/img_test.jpg'),
    ('0007', 'title7', 'price7: $00.00', 'descr7: Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'images/img_test.jpg'),
    ('0008', 'title8', 'price8: $00.00', 'descr8: Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'images/img_test.jpg'),
    ('0009', 'title9', 'price9: $00.00', 'descr9: Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'images/img_test.jpg');