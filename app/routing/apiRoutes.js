const path = require('path')
const express = require('express')
const fs = require('fs')
// const friends = require('../data/friends.js')

const getFriends = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join("app", "data", "friends.json"), (err, data) => {
      if (err) reject(err)
      resolve(JSON.parse(data))
      // console.log(`${data}`)
    })
  })
}

module.exports = app => {
  app
    .get("/api/friends", (req, res) => {
      getFriends()
        .then(friends => res.end(JSON.stringify(friends)))
        .catch(err => console.log(err))
      // return res.json(friends)
    })
    .post("/api/friends", (req, res) => {
      // console.log(req.body.name)
      getFriends()
        .then(friends => {
          // res.end(friends)
          // console.log(typeof(friends), friends[0].scores)          
          // console.log(typeof(req.body), req.body)
          friends.push(req.body)
          console.log(friends)
          // res.end(newFriend)
          res.end(JSON.stringify(friends))
        })
        .catch(err => console.log(err))
      // let newFriend = req.body
      // friends.push(newFriend)
      // res.send('added a bro')
      // console.log(friends)
    })
}