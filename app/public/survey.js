// variable for which question the user is on
let activeQuestion = 0

// function to grab the selected radio button in a group of radio buttons, takes a question name (question1, question2, etc), returns an array of scores
const getValue = (question) => {
  return Number($(`input[name=${question}]:checked`).val())
}

// function to gather the required information, returns an object to be POSTed
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

// function to cycle questions
const nextQuestion = () => {
  // check if we're past the 'enter name and photo' screen
  if (activeQuestion > 0) {
    // shift current question to the left, off screen
    $(`#question${activeQuestion}`).css('left', '-700px')
  }
  // increment question counter
  activeQuestion++
  // shift new question into center
  $(`#question${activeQuestion}`).css('left', '0px')
}

// function to cycle questions in reverse, similar to above
const prevQuestion = () => {
  $(`#question${activeQuestion}`).css('left', '700px')
  activeQuestion--
  $(`#question${activeQuestion}`).css('left', '0px')

}


// listener for submission
$('#submitBtn').on('click', (event) => {
  event.preventDefault()
  // grab results
  let result = createResults();
  // check to see if a result is there
  if (result) {
    // post to server
    $.ajax({
      url: "/api/friends/",
      method: "POST",
      data: result
    }).then(res => {
      // display results
      $('#resultPic').attr({'src': res.photo, 'alt': `A picture of ${res.name}`})
      $('#resultName').text(res.name)
      $('#resultPercent').text(`${res.percent} Match!!`)
      // slide results into frame, question 10 out of frame
      $('#question10').css('left', '-700px')
      $('#resultsGroup').css('left', '0px')
    })
  } else {
    // handle un-filled form data
    console.log('Fill em up!!!!!')
  }
})


// function to begin the survey
$('#startSurveyBtn').on('click', (event) => {
  event.preventDefault();
  // validate a name is entered, highlight input in red if not
  if (!$('#userName').val()) {
    return $('#userName').addClass('missing')
  }
  // validate a photo is entered, and is a url beginning with http, highlight input in red if not
  if (!$('#userPhoto').val() || $('#userPhoto').val().substring(0, 4) !== 'http') {
    return $('#userPhoto').addClass('missing')
  }
    // cycle the question
    nextQuestion()
    $('.name-email-group').css('left', '-700px')  
})

// listeners for next/prev buttons
$('.next-btn').on('click', (event) => {
  event.preventDefault();
  nextQuestion();
})


$('.prev-btn').on('click', (event) => {
  event.preventDefault();
  prevQuestion();
})

// remove red border on input box on focus
$('#userName, #userPhoto').on('focus', (event) => {
  $(event.target).removeClass('missing')  
})
