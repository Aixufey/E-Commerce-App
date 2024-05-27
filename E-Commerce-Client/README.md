# E-Commerce App

Welcome to the E-Commerce App, a comprehensive solution for online shopping built using the MERN (MongoDB, Express, React, Node.js) stack. This README provides an overview of the project's structure, key features, and instructions for setting up and running the application.


## Introduction

The E-Commerce App is designed to provide a seamless shopping experience for users, featuring a wide range of products, user authentication, payment integration, and more. The app leverages the power of the MERN stack, along with several other libraries and frameworks, to deliver a robust and responsive application.

### Features

- User authentication and authorization
- Product listing and detailed views
- Shopping cart and checkout functionality
- Payment processing using Stripe
- Responsive design for web and mobile devices
- Integration with Expo for enhanced mobile support

### Technologies
- React: JavaScript library for building user interfaces
- React Native: Framework for building native apps using React
- Expo: Framework and platform for universal React applications
- React Navigation: Routing and navigation for React Native apps
- Redux Toolkit: State management for JavaScript apps
- Tailwind CSS: Utility-first CSS framework

## GIF Previews

| Feature                  | GIF Preview                                      |
|--------------------------|--------------------------------------------------|
| Login                    | ![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGIxM3Ryb2xpNGd0YjZpYnM3MTM4ZTNscDIyam1nbTIzamxoZm52NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1k8Jn2XNWCvsxsZHbo/giphy.gif) |
| Forgot Password          | ![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWx3NXNkaGZ4NTFydXJkdzRlYm5yaTRpenE4MXljZ29hNjIwdno4aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KTZy5LVI9xrweco0EU/giphy.gif) |
| Mail OTP                 | ![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXdwazd6OTV3ZmljaHl5OGtqMGV3dHB5enl3MG15NTM1Z2pwMTBpZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KkS6K17a3dxAVnPpOZ/giphy.gif) |
| OTP Verification         | ![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExejM2aDB5dWppMW1qcHh6YmYzZ214NWFic3RuZDk3em04eWUwbWQ1bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Idx3HjVYEKMgJrua9w/giphy.gif) |
| Change Profile Pic       | ![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdDR3d3dlZzdtb3k0ZHdneGdnZ2t1ODd4c2cxdjRqbjB6d24zNGM1ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/UYqua9PLUpeXRIeA2v/giphy.gif) |
| Create New Product       | ![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXU5ZDN4bnhyN2E3eWFmNTIxb2U5cnYxOWVuMjdzOHVmd2Y2OG9qZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ZUuhmg7Rbqu4LOO2m/giphy.gif) |
| Add Product Images       | ![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHdzaTJ4bjdoYTA4cmV0M2FwbHVzc2hxaTY4eHYxZzFiZmgyaHl4ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dTvhOt2iGEsDfx5aJT/giphy.gif) |
| Purchase                 | ![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNG1icmFvcjY4M3c4MDE2djA2MXVzZ3dydnA3dWlpZ2k0ZzFuZHJyNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MXFo7RgZFXjD1xoerN/giphy.gif) |
| Admin Updating Orders    | ![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3dkcXhtMmQ0OWExMzFtc3JxNWZpdXduMTMxcjJlMHgxM2lvYmllaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/GQbnD9XcM5r5QAAGW4/giphy.gif) |

## Usage

To run the application, use the following commands:

| Command               | Description                              |
|-----------------------|------------------------------------------|
| `npm start`           | Starts the Expo development server       |
| `npm run android`     | Starts the Expo development server for Android |
| `npm run ios`         | Starts the Expo development server for iOS |
| `npm run web`         | Starts the Expo development server for Web |

## Technologies

| Frontend              | Backend             | Payment Integration |
|-----------------------|---------------------|---------------------|
| React                 | Node.js             | Stripe              |
| React Native          | Express.js          |                     |
| Expo                  | MongoDB             |                     |
| React Navigation      |                     |                     |
| Redux Toolkit         |                     |                     |
| Tailwind CSS          |                     |                     |

## Dependencies

| Package                          | Version    | Description                                         |
|----------------------------------|------------|-----------------------------------------------------|
| @expo/metro-runtime              | ~3.2.1     | Runtime for Metro bundler in Expo                   |
| @react-navigation/native         | ^6.1.14    | React Navigation library                            |
| @react-navigation/native-stack   | ^6.9.22    | Stack navigator for React Navigation                |
| @reduxjs/toolkit                 | ^2.2.3     | Redux Toolkit for state management                  |
| @stripe/stripe-react-native      | 0.37.2     | Stripe integration for React Native                 |
| axios                            | ^1.6.8     | Promise-based HTTP client                           |
| expo                             | ^51.0.2    | Expo framework and platform                         |
| expo-camera                      | ~15.0.6    | Camera module for Expo                              |
| expo-image-picker                | ~15.0.4    | Image picker module for Expo                        |
| expo-status-bar                  | ~1.12.1    | Status bar component for Expo                       |
| mime                             | ^4.0.1     | MIME type utility library                           |
| nativewind                       | ^2.0.11    | Tailwind CSS for React Native                       |
| react                            | 18.2.0     | React library                                       |
| react-dom                        | 18.2.0     | React DOM library                                   |
| react-native                     | 0.74.1     | React Native framework                              |
| react-native-chart-kit           | ^6.12.0    | Chart library for React Native                      |
| react-native-paper               | ^5.12.3    | Material Design library for React Native            |
| react-native-snap-carousel       | ^4.0.0-beta.6 | Carousel component for React Native               |
| react-native-svg                 | 15.2.0     | SVG library for React Native                        |
| react-native-toast-message       | ^2.2.0     | Toast messages for React Native                     |
| react-native-web                 | ~0.19.6    | React Native for Web                                |
| react-redux                      | ^9.1.1     | React bindings for Redux                            |
