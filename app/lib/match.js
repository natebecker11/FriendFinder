
// const a = [1,1,1,1,1,1,1,1,1,1]
// const b = [3,2,3,5,5,5,1,2,3,5]

// const friends = [
//   {
//     "name": "Joe",
//     "photo": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
//     "scores": [
//       5, 4, 5, 4, 1, 2, 1, 2, 3, 1
//     ]
//   },
//   {
//     "name": "Tammy",
//     "photo": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
//     "scores": [
//       1, 4, 3, 4, 2, 5, 1, 2, 4, 1
//     ]
//   },
//   {
//     "name": "Rebekah",
//     "photo": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
//     "scores": [
//       2, 2, 2, 4, 1, 3, 1, 5, 3, 1
//     ]
//   }
// ]

const rateScores = (userScores, matchScores) => {
  let rating = userScores.reduce((total, currentScore, i) => {
    let diff = Math.abs(currentScore - matchScores[i])
    return diff + total
  }, 0)
  return rating
}

const compareRates = (userScores, friendsArray) => {
  let match = friendsArray.reduce((bestMatch, currentMatch) => {
    let currentRating = rateScores(userScores, currentMatch.scores)
    let bestRating = bestMatch.rating
    return currentRating < bestRating ? {rating: currentRating, ...currentMatch} : bestMatch

  }, {
    rating: 41
  })
  return match
}

module.exports = {
  compare: compareRates,
  rate: rateScores
}

// console.log(compareRates([
//   5, 4, 5, 4, 1, 2, 1, 2, 3, 1
// ], friends))