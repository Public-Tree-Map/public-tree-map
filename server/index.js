const express = require('express')
const app = express()
const sqlite = require('sqlite3').verbose()
const compression = require('compression')

const PORT = 5000

app.use(compression())
app.use(express.static('server/static'))

app.get('/api/v1/trees', (req, res) => {
  let db = new sqlite.Database('./database.sqlite3')

  let query = `SELECT trees.name_botanical, 
                      trees.name_common,
                      trees.latitude,
                      trees.longitude,
                      trees.address,
                      trees.street,
                      trees.on_address,
                      trees.on_street,
                      trees.location_description,
                      species.native,
                      species.eol_image,
                      species.family_botanical_name
               FROM trees, species
               WHERE trees.species_id = species.id`;
  db.all(query, [], (err, rows) => {
    if (err) {
      res.send(err)
    }
    res.json(rows)
  })

  db.close()
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}.`))
