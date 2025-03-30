# 📦 TaskManager Backend (Laravel 12 + MySQL + Docker)

This is the **backend** for the TaskManager project, built using **Laravel 12**, **MySQL**, and designed for use with a React or Next.js frontend.

---

## 🚀 Requirements

- Docker & Docker Compose
- Make (optional but helpful)
- Node.js (only for frontend, not needed here)

---

## ⚙️ Installation

1. Clone the repository and navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Copy environment file and configure:
   ```bash
   cp .env.example .env
   ```

3. Start the containers:
   ```bash
   docker compose up -d --build
   or
   make up
   ```

4. Run Laravel setup:
   ```bash
   docker compose exec backend php artisan migrate --seed
   or 
   make laravel-artisan-seed
   ```

---

## 📁 Project Structure

- `app/Models/Task.php` – Eloquent model with validation logic
- `app/Http/Controllers/TaskController.php` – Handles API endpoints
- `routes/api.php` – API route definitions
- `tests/Feature/` – Feature tests (API level)
- `tests/Unit/` – Unit tests for internal logic

---

## 🔌 API Endpoints

| Method | Endpoint            | Description                  |
|--------|---------------------|------------------------------|
| GET    | `/api/tasks`        | List all tasks               |
| POST   | `/api/tasks`        | Create a new task            |
| PUT    | `/api/tasks/{id}`   | Update task                  |
| DELETE | `/api/tasks/{id}`   | Delete task                  |
| POST   | `/api/tasks/{id}/duplicate` | Duplicate a task        |
| POST   | `/api/tasks/{id}/reschedule` | Reschedule a task        |

---

## ✅ Validation Rules

- `utemezett_nap` must be a **workday** (Mon–Fri)
- Assigned users cannot exceed **480 minutes of work/day**
- All fields validated via Laravel Form Request

---

## 🧪 Running Tests

### ▶️ Feature & Unit Tests

You can run tests via Docker:

```bash
docker compose exec backend php artisan test
or
make laravel-artisan test
```

Or with PHPUnit directly:

```bash
make enter-user
docker compose exec backend vendor/bin/phpunit
```

### 🧪 Test Coverage

Tests include:

- ✅ Task creation (success & validation)
- ✅ Update, Delete, and Duplicate logic
- ✅ Custom rule: no tasks on weekends
- ✅ Custom rule: 480 min max/user/day
- ✅ JSON response structure checks

---

## 🧰 Artisan via Makefile

For convenience:

```bash
make laravel-artisan migrate
make laravel-artisan test
```

These map to Laravel commands within Docker.

---

## 🔐 CORS / API Access

Update `config/cors.php` to allow frontend (e.g. `http://localhost:3000`) access.

---

## 📎 License

MIT (or your project license)
