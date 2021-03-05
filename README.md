# Simple Nodejs Microservice Demo

## Dependencies

- `express` web framework
- `mongoose` database layer
- `rpc-websockets` rpc calls between 2 service

## How to run

> Just run `docker-compose up` in your terminal

## User Service API

- GET `/api/user` return all users
- GET `/api/user/:id` get user by id
- POST `/api/user` create user by accept json content, for example `{"user":{"first_name":"M","last_name":"S"},"address":{"street":"S","city":"c","state":"S"}}`, please note: `user.role` field is optional, default value is 'guest'
- PUT `/api/user/:id` update one user by id, body example `{"user":{"first_name":"M","last_name":"S"}}` or `{"address":{"street":"S","city":"c","state":"S"}}`
- DELETE `/api/user/:id` remove a user by id

## Address Service API
- GET `/api/address` get all addresses
- GET `/api/address/:id` get address by id
- POST `/api/address` create address by accept json, for example `{"street":"S","city":"c","state":"S"}`
- PUT `/api/address/:id` update address by id
- DELETE `/api/address:/id` remove address by id