# 📋 Express Task Manager API

A simple and clean REST API built with **Express.js** to manage **users** and their **tasks**, stored in local JSON files.

This project is part of a practical exercise to learn how to:
- Build an Express.js server
- Manage data without a database (using `.json` files)
- Expose a clean and testable RESTful API
- Use Postman to test each route

> ✅ No frontend yet – this is a backend-only API tested using Postman.

---

## 🚀 Features

### 👤 User Management
- `POST /users` – Create a new user
- `GET /users` – Get all users
- `GET /users/:id` – Get a user by ID

### ✅ Task Management
- `POST /tasks` – Create a new task
- `GET /tasks` – Get all tasks
- `GET /tasks/:id` – Get a task by ID
- `GET /users/:id/tasks` – Get all tasks for a specific user
- `PUT /tasks/:id` – Update a task
- `DELETE /tasks/:id` – Delete a task

### 🔄 Restore (reset) data
- `POST /users/restore` – Reset users to default list
- `POST /tasks/restore` – Reset tasks to default list

---

## 🧪 How to Test the API

You can test all endpoints using **Postman**, **Thunder Client** (VS Code extension), or **curl**.

A ready-to-use **Postman Collection** is provided in the `docs/` folder:

```

docs/task\_api\_collection.json


### ▶️ Example Tests

- `GET http://localhost:3000/users`
- `POST http://localhost:3000/tasks`  
  ```json
  {
    "title": "Study Express",
    "description": "Practice building REST APIs",
    "status": "in-progress",
    "userId": 1
  }
````

---

## 📦 Project Structure

```
.
├── server.js
├── package.json
├── package-lock.json
├── .gitignore ✅
├── data/
│   ├── users.json
│   └── tasks.json
├── docs/
│   └── task_api_collection.json
└── README.md

```

---

## 📥 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/express-task-manager-api
cd express-task-manager-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the server

```bash
node server.js
```

The API will be running at:
🌐 [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Built With

* [Node.js](https://nodejs.org/)
* [Express.js](https://expressjs.com/)
* [Postman](https://www.postman.com/) (for testing)

---

## 🎯 Next Steps

Later, I plan to:

* Add validation
* Introduce authentication (JWT or basic auth)
* Connect a real database (MongoDB or PostgreSQL)
* Build a React.js frontend to display and interact with this API

---

## 📚 License

This project is open-source and free to use for learning and personal projects.

---

## 👨‍💻 Author

Made with ❤️ by [F. M. David Fils RATIANDARAIBE](https://github.com/DavFilsDev)

Feel free to explore my GitHub and connect if you find this useful!


