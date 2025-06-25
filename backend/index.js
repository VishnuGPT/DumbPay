const express = require("express");
const app= express()
const cors= require("cors")
const mainRouter= require('./routes/index')
app.use(express.json())
app.use(cors());
app.use('/api/v1',mainRouter)

const express = require("express");

// ✅ Use process.env.PORT with fallback
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
