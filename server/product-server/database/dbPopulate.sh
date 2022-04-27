docker exec server_product-database_1 psql -U adapter -d products -c \
"CREATE TABLE products 
    (id varchar(4), stock integer, category varchar(50), title varchar(150), price decimal(5, 2), featured boolean, image_path varchar(50));
INSERT INTO products 
    (id, stock, category, title, price, featured, image_path)
VALUES
    ('0000', 55, 'Toys', 'Realistic Plastic Dinosaur Figure Toys', 3.27, FALSE, '/img/product/toydino.jpg'),
    ('0001', 3, 'Toys', 'Rubik''s 3X3 Cube, Puzzle Game, Classic Colors', 7.03, FALSE, '/img/product/rubikscube.jpg'),
    ('0002', 14, 'Toys', 'Classic Stacking Ring Toy, Baby Learning Game', 16.89, FALSE, '/img/product/stackingrings.jpg'),
    ('0003', 0, 'Toys', 'Newton''s Cradle, Pendulum Balance Art', 25.14, FALSE, '/img/product/newtonscradle.jpg'),
    ('0004', 28, 'Toys', 'Inflatable Flamingo Pool Float, Swim Party Toy', 31.43, TRUE, '/img/product/poolfloat.jpg'),
    ('0005', 142, 'Toys', 'Reversible Octopus Plushie, Happy or Angry', 5.14, TRUE, '/img/product/octopustoy.jpg'),
    ('0006', 98, 'Toys', 'Assorted Rubber Ducks With Bathtub, Bath Time Toy', 10.21, FALSE, '/img/product/rubberducks.jpg'),
    ('0007', 0, 'Toys', 'Soft Stuffed Bear With Bowtie Toy', 24.96, FALSE, '/img/product/teddybear.jpg'),
    ('0008', 4, 'Toys', 'Classic World Pull Along Walking Toys, Wooden Pull Dog Toy for Baby Toddler', 25.09, TRUE, '/img/product/pulldogtoy.jpg'),
    ('0009', 670, 'Toys', 'Toy Car', 19.99, FALSE, '/img/product/toycar.jpg'),
    --
    ('0010', 23, 'Beauty', 'Fake Glue On Eyelashes', 9.97, FALSE, '/img/product/eyelashes.jpg'),
    ('0011', 98, 'Beauty', 'Assorted Makeup Brushes', 21.12, FALSE, '/img/product/brushset.jpg'),
    ('0012', 43, 'Beauty', 'Oat Scented Soap', 6.53, FALSE, '/img/product/soap.jpg'),
    ('0013', 104, 'Beauty', 'Perfume Rose Scented, Small Portable Perfume', 67.32, TRUE, '/img/product/perfume.jpg'),
    ('0014', 59, 'Beauty', 'Pink Wire Sunglasses', 28.95, TRUE, '/img/product/sunglasses.jpg'),
    ('0015', 17, 'Beauty', 'Travel Makeup Bag, Portable Tan Brush Case', 7.12, FALSE, '/img/product/makeupbag.jpg'),
    ('0016', 77, 'Beauty', 'Creamy Soft Face Moisturizer, Age Reversing Formula, Makeup Remover', 52.75, FALSE, '/img/product/moisturizer.jpg'),
    ('0017', 115, 'Beauty', 'Natural Eyeshadow Palette, Mirrored Makeup Palette With Brush', 68.90, FALSE, '/img/product/eyeshadow.jpg'),
    ('0018', 208, 'Beauty', 'Premium Bronzer Palette, Travel Size Makeup Highlighter', 24.60, TRUE, '/img/product/bronzer.jpg'),
    ('0019', 61, 'Beauty', 'Age Reversing Face Primer, Long Lasting Makeup Primer', 55.12, FALSE, '/img/product/makeup.jpg'),
    --
    ('0020', 89, 'Home Decor', 'Wire Hanging Bookshelf, Stylish Wall Decor Shelf', 27.15, FALSE, '/img/product/wireshelf.jpg'),
    ('0021', 32, 'Home Decor', 'Wood Shelf Set, Set of 2 Wall Decor', 14.75, FALSE, '/img/product/smallshelfset.jpg'),
    ('0022', 404, 'Home Decor', 'Classic Home Decor Shelf, Single Wood Shelf', 30.17, FALSE, '/img/product/woodshelf.jpg'),
    ('0023', 65, 'Home Decor', 'Stylish Wood Bench, Beautiful Solid Wood Home Decor', 87.42, TRUE, '/img/product/bench.jpg'),
    ('0024', 78, 'Home Decor', 'Stylish 2 Seat Cloth Couch', 176.99, TRUE, '/img/product/couch.jpg'),
    ('0025', 43, 'Home Decor', 'Leather Chair, Home Decor Stylish Seats', 54.99, TRUE, '/img/product/chair.jpg'),
    ('0026', 102, 'Home Decor', 'Dining Room Table Set with 4 Chairs, Stylish Low Sitting Dining Set', 109.99, FALSE, '/img/product/diningtable.jpg'),
    ('0027', 6, 'Home Decor', 'Trendy Wall Clock', 18.98, FALSE, '/img/product/clock.jpg'),
    ('0028', 12, 'Home Decor', 'Simple Stylish Baby Crib, Woven Newborn Crib', 74.99, FALSE, '/img/product/crib.jpg'),
    ('0029', 14, 'Home Decor', 'Sturdy Wood Dresser, Bedroom Decor', 85.31, TRUE, '/img/product/dresser.jpg');"