sudo docker exec -d -u postgres db3 psql -c 'CREATE TABLE products (name varchar(50), description varchar(300), price varchar(10), image bytea);' &&\
sudo docker exec -d -u postgres db3 psql -c "INSERT INTO products (name, description, price) VALUES ('test0', 'test1', 'test2');"

SELECT * FROM products

--PERSISTENT (TBC)
--CREATE TABLE users (
--    username varchar(50)
--    email varchar(100)
--    passwordHash varchar(100)
--);