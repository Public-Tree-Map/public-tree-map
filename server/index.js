const express = require('express')
const app = express()
const sqlite = require('sqlite3').verbose()
const compression = require('compression')

const PORT = 5000

app.use(express.static('server/static'))
app.use(compression())

app.get('/api/v1/trees', (req, res) => {
  let db = new sqlite.Database('./database.sqlite3')

  let query = 'select tree_id, latitude, longitude, name_common from trees';
  db.all(query, [], (err, rows) => {
    res.json(rows)
  })

  db.close()
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}.`))
