# 🌐 TaskManager Frontend (Next.js + TypeScript + Docker)

This is the **frontend** for the TaskManager project, built using **Next.js**, **TypeScript**, **Tailwind CSS**, and runs inside Docker.

---

## 🚀 Requirements

- Docker & Docker Compose
- Make (optional for convenience)
- Laravel backend running (API accessible via `NEXT_PUBLIC_API_URL`)

---

## ⚙️ Installation

1. Clone the repository and navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Create `.env.local` file and configure the API URL:
   ```bash
   echo "NEXT_PUBLIC_API_URL=http://localhost:8080/api" > .env.local
   ```

3. Start the containers:
   ```bash
   docker compose up -d --build
   ```

4. Access the app:
   [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

- `components/TaskForm.tsx` – Add/Edit task form
- `components/TaskBoard.tsx` – Full task list and controls
- `components/WeeklyView.tsx` – Weekly task calendar
- `types/Task.ts` – Shared type definition
- `utils/api.ts` – Axios config for API access
- `pages/index.tsx` – Main page

---

## ✅ Features

- Create, edit, delete, and duplicate tasks
- Toggle task status (done/not done)
- Weekly calendar view
- Input validations (frontend + backend)
- Axios communication with backend API
- Tailwind CSS styling

---

## 🧪 Running Tests

### 1. Inside Docker:
```bash
docker compose exec frontend npm run test
```

### 2. Test Files:
- Tests are located next to components, e.g.:
  - `components/TaskForm.test.tsx`
  - `components/TaskBoard.logic.test.tsx`

### 3. Technologies used:
- Jest
- React Testing Library
- `ts-jest` for TypeScript support

---

## ✅ Test Coverage

Covers:
- Rendering of form fields
- Input interaction logic
- Task logic (toggle, duplicate)
- useState behavior
- Unit tests with `.tsx` logic-only files

---

## 🐳 Docker Commands

Build and run:
```bash
docker compose build
docker compose up
```

Run tests:
```bash
docker compose exec frontend npm run test
```

---

## 📎 License

MIT (or your project license)

---

## 🧰 Makefile Commands

To simplify Docker and test commands, use the Makefile:

```bash
make build      # docker compose build
make up         # docker compose up -d
make down       # docker compose down
make test       # run tests in frontend container
make ps         # docker ps
```

Make sure you're in the frontend directory when using these.

---
