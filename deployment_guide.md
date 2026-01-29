# Deployment Guide: Next.js + Judge0

This guide provides instructions for deploying your application along with a self-hosted Judge0 instance using Docker.

## Prerequisites

1.  **VPS**: A Linux-based VPS (e.g., Ubuntu 22.04) with at least 4GB of RAM (Judge0 requires significant resources).
2.  **Docker & Docker Compose**: Ensure Docker is installed on your server.
3.  **Domain**: A domain name pointing to your server IP.

## 1. Environment Configuration

Ensure your `.env` file on the server contains the following:

```env
DATABASE_URL=postgresql://user:pass@host:port/db
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_secret
JUDGE0_API_URL=http://judge0:2358
```

> [!NOTE]
> `JUDGE0_API_URL` points to the internal Docker service name `judge0` defined in `docker-compose.prod.yaml`.

## 2. Judge0 Configuration

Create a file named `judge0.conf` in your project root on the server:

```conf
# Minimal Judge0 Configuration
# Set your desired settings here
```

## 3. Build and Run

Transfer your project files to the server and run:

```bash
docker compose -f docker-compose.prod.yaml up -d --build
```

## 4. Reverse Proxy (Nginx)

To enable SSL and access your app via a domain, use Nginx:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 5. Verification

- Access your app at `https://yourdomain.com`.
- Verify code execution is working (it will now use the internal Judge0 instance).

> [!IMPORTANT]
> If you are using Neon for your database, ensure the server's IP is whitelisted if you have IP restrictions.
