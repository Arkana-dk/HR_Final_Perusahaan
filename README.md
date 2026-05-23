# HR_Final_Perusahaan

Human Resources management system built with Laravel 12, Inertia, and React (Vite).

## Tech Stack
- Backend: Laravel 12, PHP 8.2+
- Frontend: React 19, Inertia.js, Vite
- Styling: Tailwind CSS 4
- Testing: Pest

## Requirements
- PHP 8.2+
- Composer
- Node.js 18+ and npm
- SQLite (default) or a configured database

## Installation
```bash
# 1) Install backend dependencies
composer install

# 2) Create environment file
cp .env.example .env

# 3) Generate app key
php artisan key:generate

# 4) Prepare database (SQLite by default)
php artisan migrate

# 5) Install frontend dependencies
npm install
```

## Configuration
- Default database is SQLite. Update DB settings in `.env` if you use MySQL/PostgreSQL.
- If you use storage features, you may need a public link:
```bash
php artisan storage:link
```

## Run (development)
```bash
# Backend server
php artisan serve

# Frontend (Vite)
npm run dev
```

## Build
```bash
npm run build
```

## Quality
```bash
# PHP lint
composer run lint

# JS/TS lint
npm run lint

# Type check
npm run types
```

## Tests
```bash
composer test
```

## Notes
- Default database is SQLite. Update DB settings in `.env` as needed.
- Queue and session use database drivers by default. Run migrations before starting.
- Attendance check-in/check-out now enforces:
  - active work schedule for current date (`scheduled` only),
  - server-side geofence validation (if work location radius is set),
  - early check-out reason + pending approval status,
  - open-session protection (cannot check-in when previous session not checked out).
