const path = require('path')
const express = require('express')
const fs = require('fs')
// const friends = require('../data/friends.js')
const match = require('../lib/match.js')


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
      console.log(req.body)
      getFriends()
        .then(friends => {       
          let userScores = req.body.scores
          let friendMatch = match.compare(userScores, friends)
          let ratePercent = friendMatch.rating === 0 ? '100%' : (100 - (friendMatch.rating / .4)) + '%'
          let matchObject = {
            "name": friendMatch.name,
            "photo": friendMatch.photo,
            "percent": ratePercent
          }
          res.writeHead(200, {
            "Content-Type": "text/json",
            "Access-Control-Allow-Origin": "http://localhost:3000"
          })
          res.end(JSON.stringify(matchObject))
          return friends
        })
        .then(oldFriends => {
          oldFriends.push(req.body)
          let newFriends = JSON.stringify(oldFriends)
          // let newFriends = 'hefffffllo'
          console.log(newFriends)
          fs.writeFile(path.join('app', 'data', 'friends.json'), newFriends, (err, data) => {
            if (err) throw err
            console.log(data)
          })
        })
        .catch(err => console.log(err))
      // let newFriend = req.body
      // friends.push(newFriend)
      // res.send('added a bro')
      // console.log(friends)
    })
}