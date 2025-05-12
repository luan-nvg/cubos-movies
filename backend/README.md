# Movie Application Backend

## Prerequisites

- Docker
- Docker Compose
- Node.js (v18+)

## Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd movie-backend
```

### 2. Environment Configuration

1. Copy the example environment file:

```bash
cp .env.example .env
```

2. Edit the `.env` file with your specific configurations. The default Docker setup uses these credentials:

- Database:
  - Host: postgres
  - Port: 5432
  - Database: moviedb
  - User: movieuser
  - Password: moviepassword

### 3. Docker Setup and Deployment

#### Development Mode

```bash
# Start all services
docker-compose up --build

# Or run in background
docker-compose up -d --build
```

#### Specific Service Management

```bash
# Start only specific services
docker-compose up -d postgres mailhog

# Rebuild a specific service
docker-compose build backend

# View logs
docker-compose logs backend
```

### 4. Prisma Database Operations

#### Inside Docker Container

```bash
# Run migrations
docker-compose exec backend npx prisma migrate dev

# Generate Prisma Client
docker-compose exec backend npx prisma generate

# Open Prisma Studio (Database Viewer)
docker-compose exec backend npx prisma studio
```

#### Local Development (without Docker)

```bash
# Install dependencies
npm install

# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate
```

### 5. Database Access

#### PostgreSQL

- Host: localhost
- Port: 5432
- Database: moviedb
- User: movieuser
- Password: moviepassword

#### Mailhog (Email Testing)

- SMTP Server: localhost:1025
- Web Interface: http://localhost:8025

## Development Workflow

### Running Tests

```bash
# Inside Docker
docker-compose exec backend npm test

# Locally
npm test
```

### Code Quality

```bash
# Lint the code
npm run lint

# Format the code
npm run format
```

## Deployment Considerations

- Replace default credentials in production
- Use strong, unique passwords
- Configure proper AWS S3 credentials
- Set up a production-ready email service
- Implement proper logging and monitoring

## Troubleshooting

### Common Issues

1. **Database Connection**

   - Ensure PostgreSQL service is running
   - Check environment variables
   - Verify network connectivity

2. **Prisma Migrations**

   - If migration fails, reset the database:
     ```bash
     docker-compose exec backend npx prisma migrate reset
     ```

3. **Docker Compose**

   - Rebuild from scratch:
     ```bash
     docker-compose down -v
     docker-compose up --build
     ```

4. **Permission Issues**
   - On some systems, you might need to use `sudo`
   - Alternatively, adjust file permissions:
     ```bash
     chmod +x docker-entrypoint.sh
     ```

## Environment Variables Reference

| Variable                | Description                     | Default              |
| ----------------------- | ------------------------------- | -------------------- |
| `DATABASE_URL`          | PostgreSQL connection string    | -                    |
| `JWT_SECRET`            | Secret for JWT token generation | -                    |
| `AWS_REGION`            | AWS S3 region                   | -                    |
| `AWS_ACCESS_KEY_ID`     | AWS access key                  | -                    |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key                  | -                    |
| `S3_BUCKET_NAME`        | S3 bucket for file uploads      | -                    |
| `SMTP_HOST`             | Email SMTP host                 | localhost            |
| `SMTP_PORT`             | Email SMTP port                 | 1025                 |
| `EMAIL_FROM`            | Sender email address            | noreply@movieapp.com |
| `PORT`                  | Application port                | 3333                 |
| `NODE_ENV`              | Environment mode                | development          |

## Technologies

- Docker
- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- AWS S3
- Nodemailer

## License

[Specify Your License]
