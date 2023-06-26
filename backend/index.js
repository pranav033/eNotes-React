const connectToMongo = require('./db');
const express = require('express')
connectToMongo(); 
var cors = require('cors')


const app = express()
const port = 5000

app.use(express.json())
app.use(cors())
//available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`eNotes backend listening on port ${port}`)
})