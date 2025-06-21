# SHG E-Commerce Platform (Frontend)

This project is the frontend for a responsive, visually appealing e-commerce platform built with React. It serves three user roles: Admin, Buyer, and Seller, each with a specific dashboard and responsibilities.

This application was bootstrapped with Vite and uses Tailwind CSS for styling.

## Tech Stack

- **Framework:** React.js
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **HTTP Requests:** Axios
- **Build Tool:** Vite

## Features Implemented

- **Role-Based Access:** Separate dashboards and UI for Admin, Buyer, and Seller roles.
- **Authentication Flow:** A complete (frontend-only) authentication flow from a landing page modal to login/signup forms and finally to the respective dashboards.
- **Seller Dashboard:** Features for managing products, tracking orders, and viewing sales statistics.
- **Buyer Dashboard:** A personalized experience with a "first-login" preference survey, and tabs for "All Products" and "Recommended For You".
- **Admin Dashboard:** A dashboard for user management (verifying sellers) and viewing overall website statistics.
- **Component-Based Architecture:** The UI is built with a set of reusable and modular components.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1.  Clone the repository:
    ```sh
    git clone https://github.com/your-username/your-repo-name.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd your-repo-name
    ```
3.  Install the dependencies:
    ```sh
    npm install
    ```

### Running the Application

To start the development server, run:

```sh
npm run dev
```

The application will be available at `http://localhost:5173`.

## Project Structure

```
src/
|-- assets/
|-- components/
|   |-- auth/
|   |-- common/
|   |-- admin/
|   |-- buyer/
|   |-- seller/
|   |-- products/
|-- context/
|-- hooks/
|-- pages/
|-- services/
|-- App.jsx
|-- main.jsx
|-- index.css
```

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
