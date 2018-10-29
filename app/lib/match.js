// function to find compatibilty rating between two arrays. Returns a numerical rating
const rateScores = (userScores, matchScores) => {
  // find absolute difference between the scores in each array, total these up
  let rating = userScores.reduce((total, currentScore, i) => {
    let diff = Math.abs(currentScore - matchScores[i])
    return diff + total
  }, 0)
  return rating
}

// function to cycle through friends and find the one with the best (lowest) match score. Takes an array of scores, and an array of Friend objects. Returns an object that is the best match.
const compareRates = (userScores, friendsArray) => {
  // reduce to find the best match. runs rateScores to find the rating of the user and the current Friend, then compares the current "best" match and the current match, returning whichever has the better rating
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
