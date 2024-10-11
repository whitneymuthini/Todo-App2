const express = require('express'); 
const cors = require('cors'); // Import cors 
const app = express(); 
const port = 5000; 
const db = require('./db'); // Import the database module 
// Middleware to parse JSON 
app.use(express.json()); 
// Use CORS middleware 
app.use(cors()); 
// Sample root route 
app.get('/', (req, res) => { 
res.send('Welcome to the To-Do App API'); 
}); 
// Get all todos 
app.get('/todos', async (req, res) => { 
try { 
const [todos] = await db.query('SELECT * FROM todos'); 
res.json(todos); 
} catch (err) { 
res.status(500).json({ error: err.message }); 
} 
}); 
// Add a new todo 
app.post('/todos', async (req, res) => { 
const { task } = req.body; 
try { 
const [result] = await db.query('INSERT INTO todos (task) VALUES (?)', [task]); res.json({ id: result.insertId, task, completed: false }); 
} catch (err) { 
res.status(500).json({ error: err.message }); 
} 
}); 
// Mark todo as completed 
app.put('/todos/:id', async (req, res) => { 
const { id } = req.params; 
const { completed } = req.body; 
try { 
await db.query('UPDATE todos SET completed = ? WHERE id = ?', [completed, id]); res.json({ id, completed }); 
} catch (err) { 
res.status(500).json({ error: err.message }); 
} 
}); 
// Delete a todo 
app.delete('/todos/:id', async (req, res) => { 
const { id } = req.params; 
try { 
await db.query('DELETE FROM todos WHERE id = ?', [id]);
res.json({ message: 'Todo deleted successfully' }); 
} catch (err) { 
res.status(500).json({ error: err.message }); 
} 
}); 
// Start the server 
app.listen(port, () => { 
console.log(`Server is running on port ${port}`); 
}); 

