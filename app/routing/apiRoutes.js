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
          // res.end(friends)
          // console.log(typeof(friends), friends[0].scores)          
          // console.log(typeof(req.body), req.body)
          let userScores = req.body.scores
          let friendMatch = match.compare(userScores, friends)
          console.log(friendMatch.name)
          console.log(friendMatch.photo)
          let ratePercent = friendMatch.rating === 0 ? '100%' : (100 - (friendMatch.rating / .4)) + '%'
          console.log(ratePercent)
          let matchObject = {
            "name": friendMatch.name,
            "photo": friendMatch.photo,
            "percent": ratePercent
          }
          // console.log('before: ' + friends + userScore)
          // friends.push(req.body)
          // console.log('after: ' + friends)
          // res.end(newFriend)
          res.writeHead(200, {
            "Content-Type": "text/json",
            "Access-Control-Allow-Origin": "http://localhost:3000"
          })
          res.end(JSON.stringify(matchObject))
        })
        .catch(err => console.log(err))
      // let newFriend = req.body
      // friends.push(newFriend)
      // res.send('added a bro')
      // console.log(friends)
    })
}