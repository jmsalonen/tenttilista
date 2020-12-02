const express = require('express')
const cors = require('cors')
const db = require('./db')
const app = express()
app.use(cors())

var bodyParser = require('body-parser')
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello')
})

app.get('/user/', (req, res, next) => {
  db.query('SELECT * FROM appuser', (err, result) => {
    if (err) {
      return next(err)
    }
    res.send(result.rows.map(item => item))
  })
})

app.get('/user/:id', (req, res, next) => {
  db.query('SELECT * FROM appuser WHERE id = $1', [req.params.id], (err, result) => {
    if (err) {
      return next(err)
    }
    res.send(result.rows.map(item => item))
  })
})

app.get('/exam/', (req, res, next) => {
  db.query('SELECT * FROM exam', (err, result) => {
    if (err) {
      return next(err)
    }
    res.send(result.rows.map(item => item))
  })
})

app.get('/exam/:id', (req, res, next) => {
  db.query('SELECT * FROM exam WHERE id = $1', [req.params.id], (err, result) => {
    if (err) {
      return next(err)
    }
    res.send(result.rows.map(item => item))
  })
})

app.get('/user/:userid/exam', (req, res, next) => {
  db.query('SELECT exam.name FROM appuser LEFT JOIN exam ON appuser.id = exam.id_appuser WHERE appuser.id = $1', [req.params.userid], (err, result) => {
    if (err) {
      return next(err)
    }
    res.send(result.rows.map(item => item))
  })
})


/* app.get('/exam/:id', (req, res, next) => {
  db.query('SELECT * FROM exam WHERE id = $1', [req.params.id], (err, result) => {
    if (err) {
      return next(err)
    }
    res.send(result.rows[0])
  })
})  */

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
