const express = require('express')
const app = express()
const port = 3000


app.use(express.static('public'));

app.get('/api/webscrape' , (req, res) => {
    
})

app.listen(port, () => console.log(`Notification App listening on port ${port}!`))