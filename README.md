# Symetra Homework - Server

This app is a store written in typescript on node/express. It allows the store admin to define discount codes which customers apply to their order during checkout.

A special kind of discount is offered to customers after an admin-specified number of orders has been placed.

## To test without running locally:

The service is running on an EC2 instance at http://35.91.189.220:8080.

Some GET endpoints for your browser:

- http://35.91.189.220:8080/products
- http://35.91.189.220:8080/discount/LUCKY_CUSTOMER
- http://35.91.189.220:8080/admin/orders

You can use Postman to test all of the endpoints using this [Postman Collection](postman_collection.json)

## To run locally:

Clone this repo, then:

```
yarn
yarn watch
```

Then in a different terminal:

```
yarn dev
```

Run tests with:

```
yarn test
```
