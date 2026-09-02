# User Management API Documentation

Base URL: `http://localhost:5000`

---

## 🔐 Authentication

Protected routes require a JWT token in the request header:

---

## 1. Auth Routes (`/auth`)

### 1.1 Register User
* **Method:** `POST`
* **URL:** `/auth/register`
* **Access:** Public

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (`201 Created`):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "mysqlId": 1,
    "mongoId": "66d56d1f9a2b8e3a12345678",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER"
  }
}
```

---

### 1.2 Login User
* **Method:** `POST`
* **URL:** `/auth/login`
* **Access:** Public

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (`200 OK`):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER"
  }
}
```

---

## 2. Admin Routes (`/admin`)

> ⚠️ **Note:** All `/admin` routes require `Authorization: Bearer <token>` with an **ADMIN** role.

### 2.1 Get All Users
* **Method:** `GET`
* **URL:** `/admin/users`
* **Access:** Admin only

**Response (`200 OK`):**
```json
{
  "success": true,
  "users": {
    "sqlUsers": [
      {
        "id": 1,
        "name": "Admin User",
        "email": "admin@example.com",
        "role": "ADMIN",
        "created_at": "2026-09-02T06:00:00.000Z",
        "updated_at": "2026-09-02T06:00:00.000Z"
      }
    ],
    "mongoUsers": [
      {
        "_id": "66d56d1f9a2b8e3a12345678",
        "mysqlId": 1,
        "name": "Admin User",
        "email": "admin@example.com",
        "role": "ADMIN",
        "createdAt": "2026-09-02T06:00:00.000Z",
        "updatedAt": "2026-09-02T06:00:00.000Z"
      }
    ]
  }
}
```

---

### 2.2 Create User (Admin)
* **Method:** `POST`
* **URL:** `/admin/users`
* **Access:** Admin only

**Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "password123"
}
```

**Response (`201 Created`):**
```json
{
  "success": true,
  "message": "User created successfully",
  "user": {
    "mysqlId": 2,
    "mongoId": "66d56d1f9a2b8e3a12345679",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "role": "USER"
  }
}
```

---

### 2.3 Get User by ID
* **Method:** `GET`
* **URL:** `/admin/users/:id`
* **Access:** Admin only

**Example:** `/admin/users/1`

**Response (`200 OK`):**
```json
{
  "success": true,
  "user": {
    "sqlUser": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "USER",
      "created_at": "2026-09-02T06:00:00.000Z",
      "updated_at": "2026-09-02T06:00:00.000Z"
    },
    "mongoUser": {
      "_id": "66d56d1f9a2b8e3a12345678",
      "mysqlId": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "USER",
      "createdAt": "2026-09-02T06:00:00.000Z",
      "updatedAt": "2026-09-02T06:00:00.000Z"
    }
  }
}
```

---

### 2.4 Update User
* **Method:** `PUT`
* **URL:** `/admin/users/:id`
* **Access:** Admin only

**Example:** `/admin/users/1`

**Request Body:**
```json
{
  "name": "John Updated",
  "email": "johnupdated@example.com"
}
```

**Response (`200 OK`):**
```json
{
  "success": true,
  "message": "User updated successfully",
  "user": {
    "mysqlId": 1,
    "mongoId": "66d56d1f9a2b8e3a12345678",
    "name": "John Updated",
    "email": "johnupdated@example.com",
    "role": "USER"
  }
}
```

---

### 2.5 Delete User
* **Method:** `DELETE`
* **URL:** `/admin/users/:id`
* **Access:** Admin only

**Example:** `/admin/users/1`

**Response (`200 OK`):**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

---

## 3. Common Error Responses

### Missing / Invalid Token (`401 Unauthorized`)
```json
{
  "success": false,
  "message": "Authorization header is required"
}
```

### Access Denied for Non-Admin (`403 Forbidden`)
```json
{
  "success": false,
  "message": "Admin access required"
}
```

### Validation / Server Error (`500 Internal Server Error`)
```json
{
  "success": false,
  "message": "User already exists"
}
```
