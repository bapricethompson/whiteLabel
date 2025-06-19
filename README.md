# WhiteLabel 🛒🌿

WhiteLabel is a soft, earthy-themed e-commerce platform built with modern full-stack technologies. Designed with flexibility and user experience in mind, this application provides a beautiful, responsive interface for browsing and managing product listings. It's perfect for small businesses or makers looking to sell physical or digital goods online with minimal overhead and maximum control.

---

## 🌱 About the Project

This project was created as a scalable and customizable base for an e-commerce site. It features a mobile-first design using Tailwind CSS and emphasizes smooth UI experiences using React and Next.js for frontend rendering. On the backend, Express.js and Firebase Realtime Database handle product management and data persistence.

The goal was to create a simple yet robust full-stack application that covers the essential features of any e-commerce site: listing items, filtering by category, user roles, and a streamlined administrative experience.

---

## Image Uploads with Firebase Storage

Images uploaded through the app are stored securely in Firebase Storage. After a successful upload, the app saves the image’s accessible URL in the Firebase Realtime Database (or Firestore), allowing easy retrieval and display of images throughout the application without storing the actual image files in the database.

---

## 🛠️ Design & Architecture Decisions

- **Next.js** was chosen for its hybrid rendering (static and server-side), which enables blazing-fast performance and SEO optimization out of the box.
- **React** powers the UI components, making the interface modular, reusable, and easy to maintain.
- **Tailwind CSS** was used for styling because of its utility-first approach, allowing fast prototyping with a clean, consistent design system.
- **Express.js** handles our custom API routes and integrates cleanly with Firebase functions for secure, server-side logic.
- **Firebase Realtime Database** provides a lightweight, fast, and scalable backend for handling dynamic data such as product listings, user accounts, and admin actions.

---

## 📦 Packages Added

### 1. **keen-slider**

- A powerful and flexible slider/carousel library for React.

### 2. **firebase**

- Google's backend-as-a-service platform used in this project for authentication, database (Realtime), storage, and hosting.

### 2. **nookies**

- A simple and lightweight cookie utility for Next.js and React, used to easily set, parse, and destroy cookies on both client and server sides.

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone git@github.com:bapricethompson/whiteLabel.git

# Navigate into the project
cd whiteLabel

# Install dependencies
npm install

```

## Running Project Locally

YOU WILL NEED THE .ENV FILE

### Client

```bash
npm run dev
```

#### Example of Accessing Client through Browser

```bash
http://localhost:3000/
```

### Server

```bash
firebase emulators:start --only functions
```

#### Example Api Call

```bash
GET http://localhost:5001/whitelabelweb-c4f4d/us-central1/api/items
```

## Deploying

YOU WILL NEED THE .ENV FILE

### Client

```bash
npm run build
firebase deploy --only hosting
```

#### Where Live Version is Hosted

```bash
https://whitelabelweb-c4f4d.web.app/
```

### Server

```bash
firebase deploy --only functions
```

or do the two deploys at the same time

```bash
firebase deploy --only hosting,functions
```

firebase deploy --only hosting,functions

#### Example Api Call

```bash
GET https://api-53hxrufkzq-uc.a.run.app/items
```
