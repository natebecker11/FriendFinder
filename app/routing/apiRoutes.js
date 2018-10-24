const path = require('path')
const express = require('express')
const fs = require('fs')
const friends = require('../data/friends.js')

module.exports = app => {
  app
    .get("/api/friends", (req, res) => {
      return res.json(friends)
    })
    .post("/api/friends", (req, res) => {
      console.log(req.body)
      let newFriend = req.body
      friends.push(newFriend)
      res.send('added a bro')
      console.log(friends)
    })
}