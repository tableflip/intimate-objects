$(document).ready(function () {
  $("#menu").mmenu({
    // options
  }, {
    // configuration
  })

  $("a[href=#menu]").click(function (e) {
    e.preventDefault()
    $("#menu").trigger("open.mm")
  })
  
  $(window).scroll(function () {
    if ($(window).scrollTop() > 200) {
      $("html").addClass("off-top")
    } else {
      $("html").removeClass("off-top")
    }
  })
})