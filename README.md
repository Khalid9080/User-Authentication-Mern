# User Authentication - Multi-Shop Dashboard 🛒🔐

## Description

User Authentication is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application designed to handle secure user login with JWT, and subdomain-based dashboards for multiple shops. It supports persistent login via cookies, cross-subdomain authentication, and personalized shop views.

🔗 **Live Site:** [User Authentication](https://user-authentication-mern-client.onrender.com)
📂 **Repository:** [GitHub Repo](https://github.com/Khalid9080/User-Authentication-Mern.git)

---

## Features 🚀

* 🔐 **Secure Signup & Login** using JWT and HTTP-only cookies
* 🏥 **Multi-Shop Support** via subdomain-based dashboard routing
* ⏳ **Remember Me Option** (30 min or 7-day session)
* 🔎 **Unique Shop Name Verification**
* 🧠 **Smart Error Feedback & Validation**
* 🍞 **Cookie Auth Shared Across Subdomains**
* 🌀 **Loading Spinner During Auth Verification**
* 🔓 **Logout Functionality with Cookie Clearing**

---

## Tech Stack 🛠️

* **Frontend**: React.js, Tailwind CSS, Vite
* **Backend**: Node.js, Express.js
* **Database**: MongoDB (via MongoDB Atlas)
* **Authentication**: JWT (JSON Web Token), Cookie Parser

---

## Installation & Setup 🗷️

### 1. Clone the Repository

```sh
git clone https://github.com/Khalid9080/User-Authentication-Mern.git
cd User-Authentication-Mern
```

### 2. Configure Hosts File

To test subdomain-based routing locally, add the following to your system’s `hosts` file:

```
127.0.0.1 freshmart.localhost
127.0.0.1 techhub.localhost
127.0.0.1 urbanwear.localhost
127.0.0.1 booknest.localhost
127.0.0.1 greenroots.localhost
127.0.0.1 sweetbite.localhost
```

### 3. Setup Environment Variables

**Client `.env`**

```env
VITE_REACT_BASE_URL=https://user-authentication-mern-qtnm.onrender.com
```

**Server `.env`**

```env
DB_USER=User_Auth
DB_PASS=kIWMYV5RyUVb6MAu
JWT_SECRET=Khalid_Saifullah*12345678910*
```

### 4. Install Dependencies

```sh
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### 5. Run the Project Locally

```sh
# Backend
cd server
npm run dev

# Frontend
cd ../client
npm run dev
```

---

## API Documentation 🧾

### `POST /api/signup`

Registers a user.

**Body:**

```json
{
  "username": "john_doe",
  "password": "securePass123",
  "shop": "freshmart"
}
```

### `POST /api/signin`

Logs in a user and returns a secure cookie with a JWT token.

**Body:**

```json
{
  "username": "john_doe",
  "password": "securePass123",
  "rememberMe": true
}
```

### `GET /api/dashboard`

Protected route that returns user data.

**Response:**

```json
{
  "username": "john_doe",
  "shop": "freshmart"
}
```

### `GET /api/check-shop?shop=shopname`

Checks if a shop name is already taken.

**Response:**

```json
{ "exists": true }
```

### `POST /api/logout`

Clears the authentication token cookie.

---

## Folder Structure 📁

```
User-Authentication-Mern/
│
├── client/             # React frontend with Vite
│   ├── .env
│   ├── components/
│   ├── pages/
│
├── server/             # Express backend
│   ├── .env
│   ├── index.js
│   ├── routes/
│   ├── middleware/
│
└── README.md
```

---

## Contribution 🤝

We welcome contributions! To contribute:

1. Fork the repo
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to GitHub (`git push origin feature-branch`)
5. Open a Pull Request

---

## License 📜

This project is licensed under the MIT License.
You are free to use, modify, and distribute it.

---

🚀 **Test your shop dashboard routing today with this secure and scalable authentication system!**
