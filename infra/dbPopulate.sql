-- initializes products table and it's columns/fields
CREATE TABLE products 
    (id varchar(4), stock integer, category varchar(50), title varchar(50), price decimal(5, 2), descr varchar(300), image_path varchar(50));
-- populates products table rows with test data
INSERT INTO products 
    (id, stock, category, title, price, descr, image_path)
VALUES 
    ('0000', 55,'category0', 'title0', 01.01, 'descr0: Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'images/img_test.jpg'),
    ('0001', 3,'category0', 'title1', 02.00, 'descr1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'images/img_test.jpg'),
    ('0002', 14,'category0', 'title2', 423.00, 'descr2: Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'images/img_test.jpg'),
    ('0003', 0,'category1', 'title3', 04.00, 'descr3: Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'images/img_test.jpg'),
    ('0004', 28,'category1', 'title4', 05.00, 'descr4: Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'images/img_test.jpg'),
    ('0005', 142,'category2', 'title5', 06.00, 'descr5: Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'images/img_test.jpg'),
    ('0006', 98,'category2', 'title6', 07.03, 'descr6: Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'images/img_test.jpg'),
    ('0007', 0,'category2', 'title7', 08.00, 'descr7: Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'images/img_test.jpg'),
    ('0008', 4,'category2', 'title8', 09.00, 'descr8: Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'images/img_test.jpg'),
    ('0009', 670,'category3', 'title9', 10.00, 'descr9: Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'images/img_test.jpg');