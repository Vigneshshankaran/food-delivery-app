# 🍕 Food Delivery App

A responsive and user-friendly food delivery web application built using the MERN stack (MongoDB, Express, React, Node.js). The app allows users to browse various food items, add them to a cart, and place an order through a seamless checkout process.

## 📝 Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [License](#license)

## 🚀 Features

- Browse a variety of food items with images, prices, and descriptions.
- Filter and sort food items based on categories, prices, etc.
- Add items to the cart and manage the cart (add, remove, adjust quantities).
- Dynamic price calculation based on item variants and quantity.
- Secure user authentication and authorization.
- Responsive design that works well on all devices.
- Integrated payment gateway for seamless checkout.

## 📸 Screenshots

![Home Page](./screenshots/home-page.png)
*Home Page - Browse food items*

![Cart Page](./screenshots/cart-page.png)
*Cart Page - Review items before checkout*

> *Add more screenshots with descriptions as needed.*

## 🛠 Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/food-delivery-app.git
    cd food-delivery-app
    ```

2. **Install dependencies**:

   - For the server:
     ```bash
     cd backend
     npm install
     ```

   - For the client:
     ```bash
     cd ../frontend
     npm install
     ```

3. **Set up environment variables**:

   Create a `.env` file in the `backend` folder and add your environment variables (e.g., MongoDB URI, JWT secret, Stripe keys).

4. **Run the app**:

   - Start the backend server:
     ```bash
     cd backend
     npm run dev
     ```

   - Start the frontend development server:
     ```bash
     cd ../frontend
     npm start
     ```

   The app will be running at `http://localhost:3000`.

## 🎮 Usage

- Register or log in to access all features.
- Browse and filter food items, and add your favorites to the cart.
- Review your cart and proceed to checkout.
- Enter payment details to complete your order.

## 🧰 Technologies Used

- **Frontend**: React, Redux, Material-UI (MUI), Axios
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Payment Integration**: Stripe
- **Authentication**: JWT (JSON Web Tokens), bcrypt
- **Deployment**: Netlify (Frontend), Heroku (Backend)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
