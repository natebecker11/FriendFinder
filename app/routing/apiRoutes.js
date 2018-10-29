// dependencies
const path = require('path')
const express = require('express')
const fs = require('fs')
// small library I wrote for matching scores
const match = require('../lib/match.js')


// function to grab the JSON object of friends
const getFriends = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join("app", "data", "friends.json"), (err, data) => {
      if (err) reject(err)
      resolve(JSON.parse(data))
    })
  })
}

module.exports = app => {
  app
    // route to display raw json of friends
    .get("/api/friends", (req, res) => {
      getFriends()
        .then(friends => res.end(JSON.stringify(friends)))
        .catch(err => console.log(err))
    })
    // route to make a match
    .post("/api/friends", (req, res) => {
      // get the friends JSON
      getFriends()
        .then(friends => {       
          let userScores = req.body.scores
          // run the match compare to find the friend
          let friendMatch = match.compare(userScores, friends)
          // calculate a percentage match
          let ratePercent = friendMatch.rating === 0 ? '100%' : (100 - (friendMatch.rating / .4)) + '%'
          // create the match object to send to the front end
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
        // add the latest friend, then re-write friends.json
        .then(oldFriends => {
          oldFriends.push(req.body)
          let newFriends = JSON.stringify(oldFriends)
          fs.writeFile(path.join('app', 'data', 'friends.json'), newFriends, (err, data) => {
            if (err) throw err
            console.log(data)
          })
        })
        .catch(err => console.log(err))
    })
}