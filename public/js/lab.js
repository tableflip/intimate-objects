(function () {
  var form = $('form')
  
  form.submit(function (e) {
    e.preventDefault()

    $.post(form.attr('action'), {email: $('[type=email]').val()}, function () {
      form.replaceWith('<p>Thanks, your request has been submitted - please check your email to confirm.')
    })
  })
})()

var loc = $('#mapbox').data('location')
if (loc) {
  try{
//    var coords = JSON.parse(loc)
    console.log('coords',loc)
    var map = L.map('mapbox', loc)
    var marker = L.marker(loc).addTo(map)
  } catch (e) {
    console.error(e)
  }
}
