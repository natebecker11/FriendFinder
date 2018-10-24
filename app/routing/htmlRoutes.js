const path = require('path')
const express = require('express')
const fs = require('fs')


module.exports = app => {
  app
  .get('/', function(req, res) {
    fs.readFile(path.join("app", "public", "home.html"), function(err, data) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    })
  })
  .get('/:page', function(req, res) {
    let page = req.params.page
    fs.readFile(path.join("app", "public", page), function(err, data) {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" })
        res.end(`404: ${err}`)
      } else{
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);  
      }    
    })
  })
}


