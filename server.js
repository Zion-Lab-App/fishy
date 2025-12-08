import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const DB_FILE = path.join(__dirname, 'db.json');

// Middleware
app.use(cors());
app.use(express.json());

// Helper function to read DB
function readDB() {
  try {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading DB:', error);
    return { list: [] };
  }
}

// Helper function to write DB
function writeDB(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing DB:', error);
    return false;
  }
}

// GET /list - get all catches
app.get('/list', (req, res) => {
  const db = readDB();
  res.json(db.list || []);
});

// GET /list/:id - get single catch
app.get('/list/:id', (req, res) => {
  const db = readDB();
  const catchItem = db.list.find(item => item.id === req.params.id);
  
  if (!catchItem) {
    return res.status(404).json({ error: 'Catch not found' });
  }
  
  res.json(catchItem);
});

// PUT /list/:id - update catch
app.put('/list/:id', (req, res) => {
  const db = readDB();
  const index = db.list.findIndex(item => item.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Catch not found' });
  }
  
  db.list[index] = {
    ...db.list[index],
    ...req.body,
    id: req.params.id // Ensure ID doesn't change
  };
  
  if (writeDB(db)) {
    res.json(db.list[index]);
  } else {
    res.status(500).json({ error: 'Failed to save' });
  }
});

// POST /list - create new catch
app.post('/list', (req, res) => {
  const db = readDB();
  const newId = String(Math.max(...db.list.map(item => Number(item.id) || 0), 0) + 1);
  
  const newCatch = {
    id: newId,
    ...req.body
  };
  
  db.list.push(newCatch);
  
  if (writeDB(db)) {
    res.status(201).json(newCatch);
  } else {
    res.status(500).json({ error: 'Failed to save' });
  }
});

// DELETE /list/:id - delete catch
app.delete('/list/:id', (req, res) => {
  const db = readDB();
  const index = db.list.findIndex(item => item.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Catch not found' });
  }
  
  db.list.splice(index, 1);
  
  if (writeDB(db)) {
    res.json({ success: true });
  } else {
    res.status(500).json({ error: 'Failed to save' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
