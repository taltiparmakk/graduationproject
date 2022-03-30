CREATE DATABASE products;

CREATE TABLE products (
    id SERIAL PRIMARY KEY, 
    p_name TEXT NOT NULL, 
    p_category TEXT NOT NULL,
    p_description TEXT NOT NULL,
    p_price INTEGER NOT NULL
    p_image TEXT NOT NULL
    
);
