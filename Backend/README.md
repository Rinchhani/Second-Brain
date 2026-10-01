# Monolith Intelligence — Backend

Express + SQLite REST API for the Stitch Monochrome Second Brain Dashboard.

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express 4
- **Database**: SQLite via `better-sqlite3` (file stored at `../data/second_brain.db`)
- **Dev server**: nodemon

## Quick Start

```bash
cd Backend

# 1. Install dependencies
npm install

# 2. Seed the database with demo data (run once)
npm run seed

# 3. Start the dev server (auto-restarts on file change)
npm run dev

# — or —

# Start in production mode
npm start
```

The server runs on **http://localhost:5000** by default.

## API Reference

### Health
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Server health check |

### Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard/stats` | Aggregated counts & stats |

### Ideas Vault
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/ideas` | List all ideas (`?category=WORK&search=query`) |
| GET | `/api/ideas/:id` | Get idea by ID |
| POST | `/api/ideas` | Create idea `{ title, description, category, tags[] }` |
| PATCH | `/api/ideas/:id` | Update idea fields |
| PATCH | `/api/ideas/:id/bookmark` | Toggle bookmark |
| DELETE | `/api/ideas/:id` | Delete idea |

### Focus Habits
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/habits` | List all habits |
| GET | `/api/habits/:id` | Get habit by ID |
| POST | `/api/habits` | Create habit `{ title, targetInfo }` |
| PATCH | `/api/habits/:id` | Update title/targetInfo |
| PATCH | `/api/habits/:id/today` | Toggle today's completion |
| PATCH | `/api/habits/:id/day/:dayIndex` | Toggle a specific day (0–6) |
| DELETE | `/api/habits/:id` | Delete habit |

### Books
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/books` | List all books |
| GET | `/api/books/:id` | Get book by ID |
| POST | `/api/books` | Add book `{ title, author, coverUrl, currentPage, totalPages, tags[] }` |
| PATCH | `/api/books/:id` | Update book fields |
| PATCH | `/api/books/:id/progress` | Update reading progress `{ currentPage }` |
| DELETE | `/api/books/:id` | Delete book |

### Thought Insights
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/insights` | List all insights |
| GET | `/api/insights/random` | Random insight (`?exclude=id` to skip current) |
| GET | `/api/insights/:id` | Get insight by ID |
| POST | `/api/insights` | Add insight `{ quote, tags[], vaultNumber? }` |
| PATCH | `/api/insights/:id/bookmark` | Toggle bookmark |
| DELETE | `/api/insights/:id` | Delete insight |

### Decision Vectors
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/decision-vectors` | List all vectors |
| GET | `/api/decision-vectors/:id` | Get vector by ID |
| POST | `/api/decision-vectors` | Add vector `{ type: "positive"\|"negative", text }` |
| PATCH | `/api/decision-vectors/:id` | Update text |
| DELETE | `/api/decision-vectors/:id` | Delete vector |

### Recent Synapses
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/synapses` | Get recent synapses (`?limit=8`) |
| POST | `/api/synapses` | Add synapse `{ title, category? }` |
| DELETE | `/api/synapses/:id` | Delete synapse |

## Project Structure
```
Backend/
├── src/
│   ├── server.js               # Express app entry point
│   ├── db/
│   │   ├── database.js         # SQLite setup & schema
│   │   └── seed.js             # Demo data seeder
│   └── routes/
│       ├── ideas.js
│       ├── habits.js
│       ├── books.js
│       ├── insights.js
│       ├── decisionVectors.js
│       ├── synapses.js
│       └── dashboard.js
├── .env.example
└── package.json
```

## CORS
The backend is configured to allow requests from:
- `http://localhost:5173` (Vite default)
- `http://localhost:4173` (Vite preview)
- `http://localhost:3000`
