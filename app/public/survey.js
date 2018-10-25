


const getValue = (question) => {
  return $(`input[name=${question}]:checked`).val()
}

$(document).ready(() => {
  let questions = Array.from($('.question-group'))
  console.log(questions)
})