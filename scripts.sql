create extension if not exists "uuid-ossp";

CREATE TABLE carts (
  id uuid primary key default uuid_generate_v4(),
  created_at date NOT NULL,
  updated_at date NOT NULL
)

CREATE TABLE cart_items (
  cart_id uuid,
  product_id uuid,
  count integer,
  foreign key ("cart_id") references "carts" ("id")
)

INSERT INTO carts (id, created_at, updated_at) 
VALUES('a25e0111-3d8e-4937-b38d-20f5c292d223', now(), now())

INSERT INTO cart_items (cart_id, product_id, count)
VALUES('a25e0111-3d8e-4937-b38d-20f5c292d223', '18070ad8-524a-472c-8af4-42ec893783b7', 2)


CREATE TABLE orders (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid NOT NULL,
    cart_id uuid NOT NULL,
    payment JSONB,
    delivery JSONB,
    comments TEXT,
    status TEXT,
    total INTEGER NOT NULL
)