//var cards = [ "TOUCH", "SMELL", "GAZE", "SPACE", "HOLD", "REVEAL", "FEELING", "PRIVATE" ]

var cards = $('.cards .card').map(function(i, el){ return el.innerHTML })

var lastPicks = []

function randomItem (arr) {
  var i = Math.floor(Math.random() * arr.length)
  return arr[i]
}

function pseudoRandomItem (arr) {
  for(var res = randomItem(arr);
      lastPicks.indexOf(res) > -1;
      res = randomItem(arr)){}

  lastPicks.unshift(res);

  if ( lastPicks.length > 4) lastPicks.pop()

  return res
}

function newCard(){
  var card = pseudoRandomItem(cards)
  $('.fullscreen .card').text(card)
}

$('.fullscreen').on('click', newCard)

$(document).on('keydown', function (evt) {
  if (evt.keyCode === 27) {
    $('.fullscreen').hide()
  } else {
    newCard()
  }
})

$(document).on('click', '.cards .card', function(evt){
  var text = $(evt.target).text()
  $('.fullscreen .card').text(text)
  $('.fullscreen').show()
})

$('.close').on('click', function(){
  $('.fullscreen').hide()
})


$(document).on('click', '#Star-1', function(evt){
  alert('STAR')
})

$(document).on('click', '#Polygon-1', function(evt){
  alert('POLYGON')
})

$(document).on('click', '#Rectangle-1', function(evt){
  alert('SQUARE')
})

$(document).on('click', '#Triangle-1', function(evt){
  alert('TRIANGLE')
})