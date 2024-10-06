const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the current directory
app.use(express.static(path.join(__dirname, '.')));

// Handle all GET requests by serving index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Make sure to adjust the file name if needed
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
