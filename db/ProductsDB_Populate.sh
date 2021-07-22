# initializes products table
sudo docker exec -d -u postgres db psql -c 'CREATE TABLE products (name varchar(50), description varchar(300), price varchar(10), image bytea);'
# populates products table with test data
sudo docker exec -d -u postgres db psql -c "INSERT INTO products (name, description, price) VALUES ('test0', 'test1', 'test2');"

#SELECT * FROM products

#--PERSISTENT (TBC)
#--CREATE TABLE users (
#--    username varchar(50)
#--    email varchar(100)
#--    passwordHash varchar(100)
#--);