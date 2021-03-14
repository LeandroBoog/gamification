
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/', (req, res) => {
    console.log(req.body)
    res.send('Recieved POST')
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Example app listening at http://tl.ddns.timoschwarzer.com:${PORT}`)
})