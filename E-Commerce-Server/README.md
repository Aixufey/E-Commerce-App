# E-Commerce Backend

Welcome to the backend service for the E-Commerce App. This server is responsible for handling all API requests, user authentication, data storage, and other backend operations. The server is built using Node.js and Express, with MongoDB as the database.

## Introduction

The E-Commerce Backend is designed to provide a robust and scalable server for the E-Commerce App. It handles user authentication, product management, order processing, and integration with third-party services like Stripe for payments and Cloudinary for image storage.

## Features

- User authentication and authorization
- Product management (CRUD operations)
- Order processing and management
- Integration with Stripe for payment processing
- Image upload and storage with Cloudinary
- Environment configuration with dotenv


## Usage

To run the application, use the following commands:

| Command             | Description                                |
|---------------------|--------------------------------------------|
| `npm run dev`       | Starts the development server with nodemon |
| `npm start`         | Starts the production server               |

## Technologies

| Technology          | Description                                  |
|---------------------|----------------------------------------------|
| Node.js             | JavaScript runtime for server-side programming |
| Express.js          | Web application framework for Node.js       |
| MongoDB             | NoSQL database for storing application data |
| Mongoose            | ODM for MongoDB                             |
| Stripe              | Payment processing platform                 |
| Cloudinary          | Cloud-based image and video management      |
| bcrypt              | Library for hashing passwords               |
| jsonwebtoken        | Library for creating and verifying JWTs     |
| nodemailer          | Module for sending emails                   |
| multer              | Middleware for handling multipart/form-data |
| cors                | Middleware for enabling CORS                |
| dotenv              | Module for loading environment variables    |
| cookie-parser       | Middleware for parsing cookies              |
| datauri             | Utility for generating Data URIs            |
| validator           | String validation and sanitization library  |

## Scripts

The following scripts are available in the project:

| Script              | Description                                |
|---------------------|--------------------------------------------|
| `npm run dev`       | Starts the development server with nodemon |
| `npm start`         | Starts the production server               |

## Dependencies

| Package            | Version   | Description                                         |
|--------------------|-----------|-----------------------------------------------------|
| bcrypt             | ^5.1.1    | Library for hashing passwords                       |
| cloudinary         | ^2.1.0    | Cloud-based image and video management              |
| cookie-parser      | ^1.4.6    | Middleware for parsing cookies                      |
| cors               | ^2.8.5    | Middleware for enabling CORS                        |
| datauri            | ^4.1.0    | Utility for generating Data URIs                    |
| dotenv             | ^16.4.5   | Module for loading environment variables            |
| express            | ^4.19.2   | Web application framework for Node.js               |
| gitignore          | ^0.7.0    | Manage .gitignore files                             |
| jsonwebtoken       | ^9.0.2    | Library for creating and verifying JWTs             |
| mongoose           | ^8.3.0    | ODM for MongoDB                                     |
| multer             | ^1.4.5-lts.1 | Middleware for handling multipart/form-data     |
| nodemailer         | ^6.9.13   | Module for sending emails                           |
| stripe             | ^15.1.0   | Payment processing platform                         |
| validator          | ^13.11.0  | String validation and sanitization library          |
