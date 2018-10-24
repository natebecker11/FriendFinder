
const a = [1,1,1,1,1,1,1,1,1,1]
const b = [3,2,3,5,5,5,1,2,3,5]

const rateScores = (userScores, matchScores) => {
  let rating = userScores.reduce((total, currentScore, i) => {
    let diff = Math.abs(currentScore - matchScores[i])
    return diff + total
  }, 0)
  return rating
}




console.log(rateScores(a,b))