# 🎓 Advance Placement Management System

A comprehensive, full-stack web application meticulously crafted to streamline and automate campus placement workflows. Designed with distinct role-based access for Administrators and Students, this system brings efficiency and transparency to the placement lifecycle.

![Banner](https://github.com/manasvisoni04/placement-management-system/assets/your-banner-image.png) <!-- Optional: Add a banner image here -->

---

## 🌟 Key Features

### 👨‍💼 Administrator Portal

* **Drive Management:** Create, update, and schedule placement drives with detailed eligibility criteria (branches, CGPA, backlogs).
* **Applicant Tracking:** Monitor student applications in real-time. View resumes and manage applicant statuses (Applied, Shortlisted, Selected, Rejected).
* **Query Resolution:** Centralized dashboard to view and respond to student inquiries promptly.
* **Data Export:** (If applicable) Export applicant data for easy sharing with recruiters.

### 🎓 Student Portal

* **Opportunity Board:** Browse active placement drives matching their profile.
* **Seamless Application:** One-click application process for eligible drives.
* **Resume Management:** Upload and manage resumes securely.
* **Application Tracking:** Track the status of their applications (e.g., Shortlisted for Interview).
* **Helpdesk:** Raise queries directly to the placement cell and track responses.

### 🔐 Security & Core

* **Role-Based Access Control (RBAC):** Strict segregation of admin and student privileges using JWT authentication.
* **Secure File Handling:** Robust handling of resume uploads using Multer.
* **Data Integrity:** Structured relational database schema using SQLite (via better-sqlite3) for reliable data storage.

---

## 🛠️ Technology Stack

This project leverages a modern, robust tech stack separated into distinct client and server applications.

### 🎨 Frontend (Client)

* **Framework:** [React 19](https://react.dev/)
* **Build Tool:** [Vite](https://vitejs.dev/) (for blazing fast HMR and optimized builds)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (Utility-first CSS framework)
* **Routing:** [React Router v7](https://reactrouter.com/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **HTTP Client:** [Axios](https://axios-http.com/)

### ⚙️ Backend (Server)

* **Runtime:** [Node.js](https://nodejs.org/)
* **Framework:** [Express.js](https://expressjs.com/)
* **Database:** SQLite (via `better-sqlite3` for synchronous, high-performance querying)
* **Authentication:** JWT (`jsonwebtoken`) & Password Hashing (`bcrypt`)
* **File Uploads:** `multer` (for handling multipart/form-data)
* **Email:** `nodemailer` (for notifications, if configured)

---

## 🚀 Getting Started

Follow these steps to run the application locally for development and testing.

### Prerequisites

* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
* Git

### 1. Clone the Repository

```bash
git clone https://github.com/manasvisoni04/placement-management-system.git
cd placement-management-system
```

### 2. Backend Setup (Server)

```bash
cd server
npm install
```

**Configuration:**
Create a `.env` file in the `server` directory and add necessary environment variables (e.g., `PORT`, `JWT_SECRET`).

**Start the Server:**

```bash
node index.js
# Or use nodemon for development: npx nodemon index.js
```

*The server will run on `http://localhost:5000` (or the port specified in your .env).*

### 3. Frontend Setup (Client)

Open a new terminal window.

```bash
cd client
npm install
```

**Configuration:**
Create a `.env` file in the `client` directory using the provided `.env.example`. Ensure the API base URL points to your local server.

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

**Start the Development Server:**

```bash
npm run dev &
```

*The client will run on `http://localhost:5173` (default Vite port).*

---

## 📂 Project Structure

```text
placement-management-system/
├── client/                 # React Frontend
│   ├── public/             # Static assets
│   ├── src/                # React source code
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components (Admin/Student dashboards)
│   │   ├── context/        # React context (Auth, etc.)
│   │   └── utils/          # Helper functions and API calls
│   ├── package.json
│   └── vite.config.js
├── server/                 # Express Backend
│   ├── routes/             # API route definitions (auth, admin, student)
│   ├── middleware/         # Custom middleware (JWT auth verification)
│   ├── uploads/            # Directory for uploaded resumes
│   ├── database.js         # SQLite database configuration and schema
│   ├── index.js            # Express application entry point
│   └── package.json
└── README.md
```

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📜 License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).

---

## 👩‍💻 Authors

* Manasvi Soni
* Deeksha Minj
* Mandavi Goswami
* Tanu Anjana
