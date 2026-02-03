# CodeHer

CodeHer is a feature-rich platform for coding challenges, problem creation, and collaborative learning. It combines a modern user interface with powerful backend capabilities, making it ideal for admins, moderators, and users alike.

---

## 🚀 Features

- **State-of-the-art Admin Panel:** Manage users, problems, and roles with ease.
- **Notion-style Rich Text Editor:** Create and format problems intuitively.
- **Smooth & Intuitive User Experience:** Fast, responsive, and user-friendly interface.
- **Authentication:** Supports Email + OAuth Login (Google, GitHub).
- **Multi-language Code Support:** Solve problems in various programming languages.
- **Role-based Access Control:** Fine-grained permissions for Admin, Moderator, User, and Guest.
- **Custom-themed Monaco Code Editor:** Seamless coding experience with syntax highlighting and themes.
- **Public User Profiles:** Track problem stats and showcase achievements.
- **Admin Features:** Add and manage problems, oversee platform activity.
- **User Features:** Create problem lists and manage personal progress.

---

## 🛠️ Tech Stack

- **Frontend:** React, Monaco Code Editor
- **Backend:** Express, Node.js
- **Database:** Prisma ORM
- **Third-party API:** Judge0 (code execution and evaluation)
- **Architecture:** Modular codebase, MVC pattern

---

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Gold-1234/CodeHer.git
   cd CodeHer
   ```

2. **Install dependencies**
   ```bash
   npm install
   \\ for frontend
   cd frontend
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env` in both `client` and `server` folders.
   - Fill in required values (database, Judge0 API keys, OAuth secrets, etc).

4. **Run the application**
   ```bash
   \\for backend
   npm run dev
   \\ for frontend
   cd frontend
   npm run dev
   ```

---

## 🚀 Deployment

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Judge0 server (for code execution)
- Google OAuth credentials
- Domain/SSL certificate (for production)

### Quick Local Setup with Docker

1. **Install Docker and Docker Compose**

2. **Clone and navigate to the repository**
   ```bash
   git clone https://github.com/Gold-1234/CodeHer.git
   cd CodeHer/backend
   ```

3. **Create environment files**
   - Copy `.env` and update with your values
   - Copy `frontend/.env` and update with your values

4. **Start all services**
   ```bash
   docker-compose up -d
   ```

5. **Access the application**
   - Frontend: http://localhost
   - Backend API: http://localhost:8080
   - Database: localhost:5432

### Production Deployment Options

#### Option 1: Railway (Recommended for Quick Deploy)

1. **Connect Repository**
   - Link your GitHub repo to Railway
   - Railway will auto-detect the project structure

2. **Configure Services**
   - Create PostgreSQL database service
   - Create backend service (Node.js)
   - Create frontend service (static site)

3. **Set Environment Variables**
   ```env
   DATABASE_URL=postgresql://...
   JWT_SECRET=your_secure_secret
   GOOGLE_CLIENT_ID=...
   JUDGE0_API_URL=https://your-judge0-instance
   BASE_URL=https://your-domain.com
   ```

4. **Deploy**
   - Railway handles build and deployment automatically

#### Option 2: Manual Server Deployment

1. **Set up PostgreSQL**
   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install postgresql postgresql-contrib
   sudo -u postgres createdb codeher_db
   ```

2. **Deploy Judge0**
   ```bash
   git clone https://github.com/judge0/judge0.git
   cd judge0
   docker-compose up -d
   ```

3. **Deploy Backend**
   ```bash
   git clone https://github.com/Gold-1234/CodeHer.git
   cd CodeHer/backend
   npm install
   npx prisma migrate deploy
   npm run build  # if you add a build script
   npm start
   ```

4. **Deploy Frontend**
   ```bash
   cd frontend
   npm install
   npm run build
   # Serve with nginx or any static server
   ```

#### Option 3: Using Docker Compose for Production

Create `docker-compose.prod.yml`:

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: codeher_prod
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - codeher_network

  judge0:
    image: judge0/judge0:latest
    environment:
      JUDGE0_SECRET_KEY: ${JUDGE0_SECRET}
    networks:
      - codeher_network

  backend:
    build: .
    environment:
      - DATABASE_URL=postgresql://${DB_USER}:${DB_PASSWORD}@postgres:5432/codeher_prod
      - JWT_SECRET=${JWT_SECRET}
      - GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}
      - JUDGE0_API_URL=http://judge0:2358
      - BASE_URL=${BASE_URL}
      - NODE_ENV=production
    depends_on:
      - postgres
      - judge0
    networks:
      - codeher_network

  frontend:
    build: ./frontend
    depends_on:
      - backend
    networks:
      - codeher_network

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/ssl/certs
    depends_on:
      - backend
      - frontend
    networks:
      - codeher_network

volumes:
  postgres_data:

networks:
  codeher_network:
    driver: bridge
```

### Environment Configuration

#### Backend (.env)
```env
PORT=8080
DATABASE_URL=postgresql://user:password@host:5432/database
JWT_SECRET=your_secure_jwt_secret_here
GOOGLE_CLIENT_ID=your_google_oauth_client_id
JUDGE0_API_URL=http://your-judge0-server:2358
BASE_URL=https://your-production-domain.com
NODE_ENV=production
```

#### Frontend (.env)
```env
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
VITE_API_BASE_URL=https://your-backend-domain.com/api/v1
```

### Production Checklist

- [ ] HTTPS enabled with SSL certificate
- [ ] Environment variables configured securely
- [ ] Database backups configured
- [ ] Monitoring and logging set up
- [ ] CORS configured for production domain
- [ ] Firewall rules configured
- [ ] Database migrations applied
- [ ] Static assets optimized and cached

### Troubleshooting

**Database Connection Issues**
- Ensure PostgreSQL is running
- Check DATABASE_URL format
- Verify database credentials

**Judge0 Connection Issues**
- Ensure Judge0 server is accessible
- Check JUDGE0_API_URL configuration
- Verify Judge0 is running and healthy

**Build Failures**
- Clear node_modules and reinstall
- Check Node.js version compatibility
- Verify all dependencies are installed

---
<img width="1156" height="643" alt="Screenshot 2025-08-21 at 8 20 18 AM" src="https://github.com/user-attachments/assets/27cd260e-db9b-46ce-a198-10d5c1c87118" />
<img width="1436" height="820" alt="Screenshot 2025-08-21 at 8 17 46 AM" src="https://github.com/user-attachments/assets/74c31fae-7e2f-4722-ab23-5be8cc4729e4" />
<img width="1440" height="823" alt="Screenshot 2025-08-21 at 8 19 22 AM" src="https://github.com/user-attachments/assets/a3d9721a-7523-47b3-a6e7-1f7fa42887ec" />
<img width="1153" height="656" alt="Screenshot 2025-08-21 at 8 22 43 AM" src="https://github.com/user-attachments/assets/51c8d95a-64c8-46ca-b548-5f937e63d474" />
<img width="1432" height="815" alt="Screenshot 2025-08-21 at 8 25 36 AM" src="https://github.com/user-attachments/assets/110bd0cf-0a03-4e97-b120-d26d9842eb3e" />
