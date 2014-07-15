(function () {
  var form = $('form')
  
  form.submit(function (e) {
    e.preventDefault()

    $.post(form.attr('action'), {email: $('[type=email]').val()}, function () {
      form.replaceWith('<p>Thanks, your request has been submitted - please check your email to confirm.')
    })
  })
})()
