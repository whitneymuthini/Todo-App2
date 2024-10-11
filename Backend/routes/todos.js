const express = require('express'); 
const router = express.Router(); 
const db = require('../db'); // Import the database module 
// Get all todos 
router.get('/', async (req, res) => { 
try { 
const [rows] = await db.query('SELECT * FROM todos'); 
res.json(rows); 
} catch (err) { 
res.status(500).json({ error: err.message }); 
} 
}); 
// Add a new todo 
router.post('/', async (req, res) => { 
const { task } = req.body; 
try { 
const [result] = await db.query('INSERT INTO todos (task) VALUES (?)', [task]); res.json({ id: result.insertId, task, completed: false }); 
} catch (err) { 
res.status(500).json({ error: err.message }); 
} 
}); 
// Mark todo as completed 
router.put('/:id', async (req, res) => { 
const { id } = req.params; 
const { completed } = req.body; 
try { 
await db.query('UPDATE todos SET completed = ? WHERE id = ?', [completed, id]); res.json({ id, completed }); 
} catch (err) { 
res.status(500).json({ error: err.message }); 
} 
}); 
// Delete a todo 
router.delete('/:id', async (req, res) => { 
const { id } = req.params; 
try { 
await db.query('DELETE FROM todos WHERE id = ?', [id]); 
res.json({ message: 'Todo deleted successfully' }); 
} catch (err) {
res.status(500).json({ error: err.message }); 
} 
}); 
module.exports = router; 
