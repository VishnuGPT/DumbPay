const express = require("express");
const app= express()
const cors= require("cors")
const mainRouter= require('./routes/index')
app.use(express.json())
app.use(cors());
app.use('/api/v1',mainRouter)

app.listen(3000, '192.168.14.19', () => {
  console.log('Server running at http://192.168.14.19:3000');
});
