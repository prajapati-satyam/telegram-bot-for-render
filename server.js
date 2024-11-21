require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const main = require('./componets/main.js')
app.use(express.static('public'))

// async function callmainfunc() {
//   await main()
// }

// callmainfunc();
main();
app.get('/', (req, res) => {
  res.send('<h1>Hello world!</h1>');
})

app.get((req,res)=> {
    res.status(404).send("no page found , check your url and try again");
})

// main()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})