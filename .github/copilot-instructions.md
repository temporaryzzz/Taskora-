# Taskora - AI Developer Instructions

## Architecture Overview

**Taskora** is a full-stack task management application with:

- **Frontend**: React + TypeScript + Vite + SCSS (port 3000)
- **Backend**: Spring Boot 3.5 + JWT Auth + PostgreSQL (port 8080)
- **Infrastructure**: Docker Compose with nginx reverse proxy

### Key Technology Decisions

1. **Cookie-based JWT Storage**: JWT tokens stored in httpOnly cookies with CORS credentials
2. **API Proxy Strategy**:
   - Development: Vite proxy (`/api` → `localhost:8080`)
   - Docker: Nginx reverse proxy (`/api` → `taskora-backend:8080`)
3. **HTTP in Development**: No HTTPS locally - simplifies certificate management
4. **Relative API Paths**: Frontend uses `/api/*` endpoints (works in both dev & Docker)

## Critical Configuration Points

### Backend Cookie Settings

**File**: [taskora-backend/src/main/java/com/taskora/backend/controller/AuthenticationController.java](taskora-backend/src/main/java/com/taskora/backend/controller/AuthenticationController.java)

```java
ResponseCookie cookie = ResponseCookie.from("token", token)
    .httpOnly(true)      // XSS protection
    .secure(false)       // HTTP in dev (true for HTTPS)
    .sameSite("Lax")     // CSRF + same-site requests
    .path("/")
    .maxAge(30 * 24 * 3600)
    .domain("localhost")
    .build();
```

**Why this matters**: Cookie won't be set if any parameter is wrong. Common issues:

- `sameSite("None")` requires `secure(true)` and HTTPS
- Missing `domain("localhost")` causes cookie scope problems in Docker
- Missing `credentials: 'include'` on fetch requests

### CORS Configuration

**File**: [taskora-backend/src/main/java/com/taskora/backend/config/WebSecurityConfig.java](taskora-backend/src/main/java/com/taskora/backend/config/WebSecurityConfig.java)

Must allow credentials and expose Set-Cookie header:

```java
configuration.setAllowCredentials(true);
configuration.setExposedHeaders(Arrays.asList("Set-Cookie"));
```

### Nginx Proxy Configuration

**File**: [taskora-frontend/nginx.conf](taskora-frontend/nginx.conf)

Critical settings for cookie forwarding in Docker:

```nginx
location /api/ {
    proxy_pass http://taskora-backend:8080;
    proxy_pass_header Set-Cookie;  // Forward cookies from backend
    proxy_http_version 1.1;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

## API Integration Patterns

### Frontend API Calls

**File**: [taskora-frontend/src/api.ts](taskora-frontend/src/api.ts)

All fetch calls must include:

```typescript
credentials: "include"; // Required for cookie handling
```

Use relative paths:

```typescript
export const SERVER_ADDRES = "/api"; // Works in both dev & Docker
```

### Development Proxy

**File**: [taskora-frontend/vite.config.ts](taskora-frontend/vite.config.ts)

Vite dev server proxies `/api` to backend:

```typescript
proxy: {
  '/api': {
    target: 'http://localhost:8080',
    changeOrigin: true,
  }
}
```

## Common Workflows

### Local Development

```bash
# Terminal 1: Backend (Spring Boot)
cd taskora-backend
mvn spring-boot:run

# Terminal 2: Frontend (Vite)
cd taskora-frontend
npm run dev
# Access: http://localhost:3000
```

### Docker Deployment

```bash
docker compose up --build
# Frontend: http://localhost:3000 (nginx proxy)
# Backend: http://localhost:8080 (direct)
# Database: localhost:5432
```

### Authentication Flow

1. User submits login → `/api/auth/signin` POST
2. Backend returns JWT in Set-Cookie header
3. Browser automatically stores cookie (httpOnly, Secure, SameSite)
4. Subsequent requests include cookie (credentials: 'include')
5. Backend extracts JWT from cookie via `AuthTokenFilter`

## Debugging Cookie Issues

Check browser DevTools → Application → Cookies → localhost

If cookie not appearing:

1. ✅ Verify `credentials: 'include'` in fetch calls
2. ✅ Check CORS response has `Access-Control-Allow-Credentials: true`
3. ✅ Verify Set-Cookie header in response headers
4. ✅ Check cookie attributes (secure, sameSite, domain)
5. ✅ Ensure backend is setting cookie correctly

## Project-Specific Patterns

### Task/List Structure

- **TaskList**: User's custom collections (name, order)
- **Task**: Individual items with priority, deadline, sections
- **Special Lists**: System lists (Today, Completed, Deleted, All)

### Component Hierarchy

```
App.tsx (Context provider)
├── MainPage (protected route)
│   ├── SideBar (list management)
│   └── TaskListSection (task display)
└── SignIn/SignUp (public routes)
```

### Styling

SCSS with utilities in [taskora-frontend/src/styles/helpers/](taskora-frontend/src/styles/helpers/):

- `_mixins.scss`: responsive breakpoints (`@mixin mobile`, `@mixin tablet`)
- `_functions.scss`: utility functions
- Component-scoped styles in `components/` folder

## Port Mapping

- **3000**: Frontend (nginx in Docker, Vite in dev)
- **8080**: Backend (Spring Boot)
- **5432**: PostgreSQL (Docker only)

All services communicate via Docker network `taskora-network` in containers.

## References

- Backend: Spring Security with JWT filter pattern
- Frontend: React Router for navigation, context API for state
- Database: PostgreSQL with JPA/Hibernate ORM
