require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const mongodburl = process.env.MONGODB_URL;

module.exports = { JWT_SECRET, mongodburl };
