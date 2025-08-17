require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors') // 👈 CORS package
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const bodyParser = require('body-parser');
const multer = require('multer');
const imgRoutes = require('./routes/image')
const path = require('path');
const login = require('./routes/log')
const alert = require('./routes/alert')
const del = require('./routes/del')

// express app
const app = express()

// 🔥 SMART DYNAMIC CORS - NEVER UPDATE AGAIN!
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (Postman, mobile apps, etc.)
    if (!origin) return callback(null, true);
    
    // Allow localhost for development
    if (origin === 'http://localhost:3000') {
      return callback(null, true);
    }
    
    // 🎯 AUTOMATICALLY ALLOW ALL VERCEL URLS!
    if (origin.endsWith('.vercel.app')) {
      console.log('✅ Allowing Vercel origin:', origin); // For debugging
      return callback(null, true);
    }
    
    // Block everything else
    console.log('❌ Blocking origin:', origin); // For debugging
    return callback(new Error('Not allowed by CORS'), false);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Handle preflight requests explicitly
app.options('*', cors()); // Enable preflight for all routes

// middleware 
app.use(express.json())

// Middleware for parsing JSON
app.use(bodyParser.json());

// Middleware for handling multipart/form-data (image uploads)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// 🎯 TEST ROUTE FOR RAILWAY
app.get('/', (req, res) => {
  res.json({ message: 'Digin Backend is running on Railway! 🚀' });
});

// routes
app.use('/datas', workoutRoutes)
app.use('/user', userRoutes)
app.use('/image', imgRoutes)
app.use('/log', login)
app.use('/alert', alert)
app.use('/delll', del)

// connect to db
mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // 🔥 IMPORTANT: Use Railway's PORT or fallback to 4000
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log('connected to db & listening on port', PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })
