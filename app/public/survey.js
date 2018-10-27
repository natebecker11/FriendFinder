


const getValue = (question) => {
  return Number($(`input[name=${question}]:checked`).val())
}

const createResults = () => {
  let name = $('#userName').val();
  let photo = $('#userPhoto').val();
  let questions = $('.question-group')  
  let scores = [];
  questions.each((i, question) => {scores.push(getValue(question.id))})
  if (!name || !photo) return false
  return {
      "name": name,
      "photo": photo,
      "scores": scores
    }
}

$('#submitBtn').on('click', (event) => {
  event.preventDefault()
  let result = createResults();
  // console.log(result)
  // console.log(JSON.stringify(result))
  if (result) {
    // let obj = JSON.stringify(result);
    $.ajax({
      url: "/api/friends/",
      method: "POST",
      data: result
    }).then(res => {
      console.log(res)
    })
  } else {
    // handle un-filled form data
    console.log('Fill em up!!!!!')
  }
})



// $(document).ready(() => {
//   let questions = $('.question-group')
//   questions.each((i, question) => {console.log(`${question.id}: ${getValue(question.id)}`)})
//   // console.log(questions)
// })