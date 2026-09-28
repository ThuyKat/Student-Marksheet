# Student Marksheet

A React app for entering student marks and viewing class results. Teachers enter a student's scores in five subjects. The app works out the total, percentage and grade, saves the result to Firebase, and shows the whole class on a dashboard with charts.

## Features

- **Marksheet form**: enter a student's name, 10-digit registration number and marks (0–100) for Math, Physics, Chemistry, Biology and English
- **Automatic results**: calculates total marks (out of 500), percentage and grade (A–F)
- **Form checks**: blocks the form from saving if a field or subject mark is missing, or if the registration number isn't 10 digits
- **Saved results**: stores every result in Firebase Realtime Database, one record per registration number
- **Performance dashboard**
  - Class average, highest score and pass rate
  - Bar chart of how many students got each grade
  - Pie chart of passes vs. fails
  - Table of all students, with a pop-up showing each student's subject scores

## Grading Scale

| Percentage |  Grade   |
| ---------: | :------: |
|     90–100 |    A     |
|      80–89 |    B     |
|      70–79 |    C     |
|      60–69 |    D     |
|      50–59 |    E     |
|       < 50 | F (Fail) |

## Tech Stack

- **Frontend:** React 19, React Router 7, Vite 6
- **Styling:** Tailwind CSS, Font Awesome
- **Charts:** Apache ECharts (`echarts-for-react`)
- **Backend:** Netlify Functions (serverless) + Firebase Realtime Database
- **HTTP:** Axios

## Project Structure

```
├── App.jsx                     # Routes: "/" (form) and "/dashboard"
├── firebaseConfig2.js          # API client that calls the Netlify function
├── netlify/functions/
│   └── firebaseHandler.js      # GET/POST handler that reads and writes Firebase
├── pages/
│   ├── MarksheetForm/          # Marks form and result display
│   └── Dashboard/              # Stats cards, charts, student table, details pop-up
├── netlify.toml                # Build and functions config
└── tailwind.config.js
```

## Getting Started

### Prerequisites

- Node.js 18+
- A Firebase project with Realtime Database turned on
- Netlify CLI (installed as a dependency)

### Installation

```bash
git clone https://github.com/<your-username>/student-marksheet.git
cd student-marksheet
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
FIREBASE_DATABASE_URL=https://<your-project-id>-default-rtdb.firebaseio.com
```

### Run Locally

Run the app through Netlify Dev so the serverless function works too:

```bash
npx netlify dev
```

Or run only the frontend (saving and loading data won't work):

```bash
npm run dev
```

### Build

```bash
npm run build
```

The production build goes to `dist/`.

## API

`/.netlify/functions/firebaseHandler`

| Method | Query        | Description                       |
| ------ | ------------ | --------------------------------- |
| GET    | —            | Get all student results           |
| GET    | `?regNo=...` | Get one student's result          |
| POST   | JSON body    | Save or update a student's result |

## License

ISC
