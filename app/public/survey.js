
let activeQuestion = 0

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

const nextQuestion = () => {
  if (activeQuestion > 0) {
    $(`#question${activeQuestion}`).css('left', '-700px')
  }
  activeQuestion++
  $(`#question${activeQuestion}`).css('left', '0px')
}

const prevQuestion = () => {
  $(`#question${activeQuestion}`).css('left', '700px')
  activeQuestion--
  $(`#question${activeQuestion}`).css('left', '0px')

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
      $('#resultPic').attr({'src': res.photo, 'alt': `A picture of ${res.name}`})
      $('#resultName').text(res.name)
      $('#resultPercent').text(`${res.percent} Match!!`)
      $('#question10').css('left', '-700px')
      $('#resultsGroup').css('left', '0px')
    })
  } else {
    // handle un-filled form data
    console.log('Fill em up!!!!!')
  }
})

$('#startSurveyBtn').on('click', (event) => {
  event.preventDefault();
  if (!$('#userName').val()) {
    return $('#userName').addClass('missing')
  }
  if (!$('#userPhoto').val() || $('#userPhoto').val().substring(0, 4) !== 'http') {
    return $('#userPhoto').addClass('missing')
  }
    nextQuestion()
    $('.name-email-group').css('left', '-700px')  
})

$('.next-btn').on('click', (event) => {
  event.preventDefault();
  nextQuestion();
})

$('.prev-btn').on('click', (event) => {
  event.preventDefault();
  prevQuestion();
})

$('#userName, #userPhoto').on('focus', (event) => {
  $(event.target).removeClass('missing')  
})
