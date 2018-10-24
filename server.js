const path = require('path')
const express = require('express')
const fs = require('fs')

const app = express();
const PORT = process.env.port || 3000;

const apiRoutes = require('./app/routing/apiRoutes.js')
const htmlRoutes = require('./app/routing/htmlRoutes.js')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

htmlRoutes(app)




app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});