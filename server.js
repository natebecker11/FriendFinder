// dependencies
const path = require('path')
const express = require('express')
const fs = require('fs')
const app = express();
const PORT = process.env.PORT || 3000;

// routes
const apiRoutes = require('./app/routing/apiRoutes.js')
const htmlRoutes = require('./app/routing/htmlRoutes.js')

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'app', 'public')))

// run routes
htmlRoutes(app)
apiRoutes(app)


// initiate server
app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});