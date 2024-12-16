# Patient Appointment Management API

## Overview
This is a Node.js/Express REST API for managing clinicians, patients, and appointments using SQLite as the database.

## Features
- CRUD operations for Clinicians
- CRUD operations for Patients
- CRUD operations for Appointments
- NPI (National Provider Identifier) validation

## Backend Setup

### Installation

1. Navigate to the backend directory
   ```bash
   cd patient-appointments-api
   ```

2. Install dependencies
   ```bash
   npm install
   ```

### Environment Configuration

Create a `.env` file in the patient-appointments-api directory and use the `.env.example` content as a template.
```bash
cp .env.example .env
```

### Running the Backend

Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:3000`.

## Frontend Setup

### Installation

1. Navigate to the frontend directory
   ```bash
   cd appointments-frontend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

### Running the Frontend

Start the development server:
```bash
npm run dev
```

Open your browser and visit `http://localhost:5173`


## Technologies Used

- **Backend**
    - Node.js
    - Express.js
    - SQLite

- **Frontend**
    - React
    - Vite
    - Tailwind CSS

