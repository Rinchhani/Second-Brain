/**
 * server.js — Entry point for the Monolith Intelligence Express backend (MongoDB Atlas)
 */

require('dotenv').config();

const express    = require('express');
const cors       = require('cors');
const connectDB  = require('./db/connect');

// Import routes
const ideasRouter           = require('./routes/ideas');
const habitsRouter          = require('./routes/habits');
const booksRouter           = require('./routes/books');
const insightsRouter        = require('./routes/insights');
const decisionVectorsRouter = require('./routes/decisionVectors');
const synapsesRouter        = require('./routes/synapses');
const dashboardRouter       = require('./routes/dashboard');

const app  = express();
const PORT = process.env.PORT || 5000;
const IS_PROD = process.env.NODE_ENV === 'production';

// ── Connect to MongoDB Atlas ──────────────────────────────────────────────────
connectDB();

// ── CORS origins ──────────────────────────────────────────────────────────────
// In production, set CORS_ORIGIN env var (comma-separated list of allowed origins)
const allowedOrigins = IS_PROD
  ? (process.env.CORS_ORIGIN || '').split(',').map(o => o.trim()).filter(Boolean)
  : ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:4173'];

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Request logger ────────────────────────────────────────────────────────────
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/ideas',            ideasRouter);
app.use('/api/habits',           habitsRouter);
app.use('/api/books',            booksRouter);
app.use('/api/insights',         insightsRouter);
app.use('/api/decision-vectors', decisionVectorsRouter);
app.use('/api/synapses',         synapsesRouter);
app.use('/api/dashboard',        dashboardRouter);

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({
    status:    'ok',
    service:   'Monolith Intelligence API',
    version:   '2.0.0',
    database:  'MongoDB Atlas',
    timestamp: new Date().toISOString()
  });
});

// ── 404 ───────────────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ── Global error handler ──────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error('[ERROR]', err);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🧠  Monolith Intelligence API  →  http://localhost:${PORT}`);
  console.log(`    Health:  http://localhost:${PORT}/health\n`);
  console.log('    Endpoints:');
  console.log('    GET  /api/dashboard/stats');
  console.log('    GET  /api/ideas           POST /api/ideas');
  console.log('    GET  /api/habits          POST /api/habits');
  console.log('    GET  /api/books           POST /api/books');
  console.log('    GET  /api/insights        POST /api/insights');
  console.log('    GET  /api/insights/random');
  console.log('    GET  /api/decision-vectors  POST /api/decision-vectors');
  console.log('    GET  /api/synapses        POST /api/synapses\n');
});

module.exports = app;
