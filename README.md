# Symetra Homework - Server

This app is a back-end which serves as an API to the [https://github.com/erichaney144/homework-client](front-end). It is written in typescript on node/express.

It's an commerce app. The site admin can define discount codes which customers can apply to their orders during checkout.

A special kind of discount is sometimes offered to customers when they log in. This discount is triggered after an admin-specified number of orders has been placed.

## To test without running locally:

The service is running on an EC2 instance at http://54.190.62.35:8080.

Some GET endpoints for your browser:

- http://54.190.62.35:8080/products
- http://54.190.62.35:8080/discount/LUCKY_CUSTOMER
- http://54.190.62.35:8080/admin/orders

Use Postman to interact with all of the endpoints using this [Postman Collection](postman_collection.json)

## To run locally:

Clone this repo, then:

```
yarn
yarn watch
```

Make sure you don't have anything running on port 80

Then in a different terminal:

```
yarn dev
```

Run tests with:

```
yarn test
```
